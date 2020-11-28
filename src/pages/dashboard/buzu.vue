<template>
    <view>
      <cu-custom bgImage="/static/images/bar3.jpg" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">低库存</block>
        </cu-custom>

      <view class="cu-bar search bg-white">
        <view class="cu-item">
          <text class="lg text-gray cuIcon-scan margin-left-xs" style="font-size: 22px;"></text>
        </view>
        <view class="search-form round">
          <text class="cuIcon-search"></text>
          <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false"
                 type="text" placeholder="搜索商品" v-model="query.keywords" confirm-type="search"></input>
        </view>
        <view class="action">
          <button @tap="searchTask" class="cu-btn line-green shadow-blur round">搜索</button>
        </view>
      </view>
      <scroll-view scroll-y class="page">
        <navigator v-for="(task,index) in taskList" :key="task.id" :url="`/pages/workshop/task_detail?taskId=${task.id}`">
          <buzu-card :task-info="task" @showTaskInfo="showTaskInfo"></buzu-card>


        </navigator>
        <uni-load-more @tap="loadMore" :status="moreInfo" :contentText="loadMoreText" :loadingType="moreInfo"></uni-load-more>
      </scroll-view>

        <view class="cu-load load-modal" v-if="loadModal">
            <view class="cuIcon-emojifill text-orange"></view>
            <view class="gray-text">加载中...</view>
        </view>

      <radio-modal :title="selectInfoTitle"
                   @touchmove.prevent
                   :show="showSelectModal"
                   show-type="common"
                   @hideModal="showSelectModal = false">
        <view slot="common" class="cu-list menu text-left">
          <view class="cu-item" v-for="it in showInfo.task" :key="it.id">
            <view class="content">
              <text class="cuIcon-info"></text>
              <text class="text-grey">{{it.operator.name}}</text>
            </view>
            <view class="action">
              <text class="text-grey">{{it.count}}</text>
            </view>
          </view>
        </view>
      </radio-modal>
    </view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import Cloud from '../../utils/cloud'
    import BuzuCard from "@/components/card/buzu_card.vue";
    import RadioModal from "@/components/common/radio_modal.vue";
    import UniLoadMore from "../../components/common/uni-load-more.vue";

    @Component({
        name: 'BuZu',
        components: {
          BuzuCard,
          UniLoadMore,
          RadioModal
        }
    })
    export default class extends Vue {
      private  TabCur:number=0
      private  scrollLeft:number=0
        private cloud = new Cloud()
        private taskList:any[] = []
      private  tabCur:number=0
        private pullDownBool:boolean = false
        private loadModal:boolean = false
        private treeNodeId:number = 0
        private moreInfo:string = 'more'
        private loadMoreText = {contentdown: "点我加载更多",contentrefresh: "正在加载...",contentnomore: "没有更多数据了"}


        private query:any = {
              keywords: '',
              start: 0,
              limit: 20,
              state: 0,
            department: null
          }

        private onPullDownRefresh() {
          this.query.start = 0
          this.moreInfo = 'more'
          this.query.keywords = ''
          this.getTask()
        }



      private showSelectModal:boolean = false
      private selectInfoTitle:string = ''
      private showInfo:any = {}
      showTaskInfo(e:any){
        this.showInfo = e
        this.selectInfoTitle = '分享成功'
        this.showSelectModal = true
      }


      private onLoad (option:any) {
          if(option.treeNodeId){
            this.treeNodeId = option.treeNodeId
            this.query.department = this.treeNodeId
          }
        }
        private mounted(){
            this.getTask()
            uni.$on('mainRefresh',(data)=>{
                if(data.page === 'task'){
                    this.pullDownBool = true
                    this.pullDownRefresh()
                }
            })
        }

        private searchTask(){
          this.query.start = 0
          this.moreInfo = 'more'
          this.getTask()
        }
        private pullDownRefresh() {
            this.query.keywords = ''
            this.getTask()
        }

        private loadMore(){
          if(this.moreInfo !== 'more')return
          this.query.start = this.taskList.length
          this.moreInfo = 'loading'
          this.getTask()
        }

        private getTask(){
            this.loadModal = true
            this.cloud.getBuzu(this.query).then((res:any)=>{
              if(this.query.start === 0){
                this.taskList = res.data
              }else {
                this.taskList = [...this.taskList,...res.data]
              }
              if (res.data && res.data.length === 0){
                this.moreInfo = 'nomore'
              }else {
                this.moreInfo = 'more'
              }
                if(this.pullDownBool){
                    uni.stopPullDownRefresh()
                    this.pullDownBool = false
                }
              this.loadModal = false
            }).finally(()=>{
              this.pullDownBool = false
              this.loadModal = false
              uni.stopPullDownRefresh()
            })
        }

        private tabSelect(e:any) {
            this.tabCur = e.currentTarget.dataset.id;
            this.query.start = 0
            this.moreInfo = 'more'
            this.query.state = e.currentTarget.dataset.id
            this.getTask()
        }
        private barSelect(e:any) {
          this.TabCur = e.currentTarget.dataset.id;6
          this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
        }


        public InputFocus(){

        }

        public InputBlur(){

        }


    }
</script>
<style scoped>

</style>


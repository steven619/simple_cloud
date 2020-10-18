<template>
    <view>
        <cu-custom bgColor="bg-gradual-green" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">机床</block>
        </cu-custom>
<!--        <scroll-view scroll-x class="bg-white nav">-->
<!--            <view class="flex text-center">-->
<!--                <view class="cu-item flex-sub" :class="item.value==tabCur?'text-orange cur':''"-->
<!--                      v-for="(item,index) in deviceStateList" :key="index" @tap="tabSelect" :data-id="item.value">-->
<!--                    {{item.name}}-->
<!--                </view>-->
<!--            </view>-->
<!--        </scroll-view>-->

        <scroll-view scroll-y class="page">

            <view class="cu-bar search bg-white">
                <view class="search-form round">
                    <text class="cuIcon-search"></text>
                    <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false"
                           type="text" placeholder="搜索设备" v-model="query.keywords" confirm-type="search"></input>
                </view>
                <view class="action">
                    <button @tap="searchDevice" class="cu-btn line-green shadow-blur round">搜索</button>
                </view>
            </view>

            <navigator v-for="(device,index) in deviceList" :key="device.id" :url="`/pages/workshop/device_detail?deviceId=${device.id}`">
                <device-card :device-info="device"></device-card>
            </navigator>
            <uni-load-more @tap="loadMore" :status="moreInfo" :contentText="loadMoreText" :loadingType="moreInfo"></uni-load-more>
        </scroll-view>

        <view class="cu-load load-modal" v-if="loadModal">
            <view class="cuIcon-emojifill text-orange"></view>
            <view class="gray-text">加载中...</view>
        </view>
    </view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
    import Cloud from '../../utils/cloud'
    import UniLoadMore from "../../components/common/uni-load-more.vue";
    import DeviceCard from '../../components/card/device_card.vue'
    @Component({
        name: 'device',
        components: {
          UniLoadMore,
          DeviceCard
        }
    })
    export default class extends Vue {
        private cloud = new Cloud()
        private deviceId:string = ''
        private deviceList:any[] = []
        private deviceStateList = [
            {name: '全部', value: 0},
            {name: '运行', value: 1},
            {name: '空闲', value: 2},
            {name: '离线', value: 3},
            {name: '告警', value: 4}
        ]
        private tabCur:number = 0
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
          this.getDevice()
        }

        private onLoad (option:any) {
          if(option.treeNodeId){
            this.treeNodeId = option.treeNodeId
            this.query.department = this.treeNodeId
          }
        }
        private mounted(){
            this.getDevice()
            uni.$on('mainRefresh',(data)=>{
                if(data.page === 'device'){
                    this.pullDownBool = true
                    this.pullDownRefresh()
                }
            })
        }

        private searchDevice(){
          this.query.start = 0
          this.moreInfo = 'more'
          this.getDevice()
        }

        private pullDownRefresh() {
            this.query.keywords = ''
            this.getDevice()
        }

        private loadMore(){
          if(this.moreInfo !== 'more')return
          this.query.start = this.deviceList.length
          this.moreInfo = 'loading'
          this.getDevice()
        }

        private getDevice(){
            this.loadModal = true
            this.cloud.getTask(this.query).then((res:any)=>{
              if(this.query.start === 0){
                this.deviceList = res.data
              }else {
                this.deviceList = [...this.deviceList,...res.data]
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
            this.getDevice()
        }


        public InputFocus(){

        }

        public InputBlur(){

        }


    }
</script>
<style scoped>

</style>


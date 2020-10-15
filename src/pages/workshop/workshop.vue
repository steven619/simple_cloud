<template>
  <view>
    <cu-custom bgColor="bg-gradual-green" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">机床列表</block>
    </cu-custom>
    <scroll-view scroll-y class="page">

      <view class="cu-bar search bg-white">
        <view class="search-form round">
          <text class="cuIcon-search"></text>
          <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false"
                 type="text" placeholder="搜索仓库" v-model="query.keywords" confirm-type="search"></input>
        </view>
        <view class="action">
          <button @tap="searchGoods" class="cu-btn line-green shadow-blur round">搜索</button>
        </view>
      </view>
      <view v-for="(treeNode,index) in treeNodeList" :key="treeNode.id" @tap.stop="goPage(treeNode)">
        <tree-node-card v-if="treeNode.name" :tree-node-info="treeNode"></tree-node-card>
      </view>
      <uni-load-more @clickLoadMore="loadMoreInfo" :status="moreInfo" :contentText="loadMoreText" :loadingType="moreInfo"></uni-load-more>
    </scroll-view>
    <view class="cu-load load-modal" v-if="loadModal">
      <view class="cuIcon-emojifill text-orange"></view>
      <view class="gray-text">加载中...</view>
    </view>
    <view class="cu-tabbar-height"></view>
  </view>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
  import Cloud from '../../utils/cloud'
  import UniLoadMore from "../../components/common/uni-load-more.vue";
  import TreeNodeCard from "@/components/card/tree-node.vue";
  @Component({
    name: 'Workshop',
    components: {
      UniLoadMore,
      TreeNodeCard
    }
  })

  export default class extends Vue {

    private cloud = new Cloud()
    private query:any = {keywords: '', start:0, p_id: null}
    private treeNodeList:any[] = []
    private pullDownBool:boolean = false
    private moreInfo:string = 'more'
    private loadModal:boolean = false
    private loadMoreText = {contentdown: "点我加载更多",contentrefresh: "正在加载...",contentnomore: "没有更多数据了"}
    private treeNodeId:number = 0

    onLoad (option:any) {
      if(option.treeNodeId){
        this.treeNodeId = option.treeNodeId
        console.log('this.treeNodeId', this.treeNodeId)
        this.query.p_id = this.treeNodeId
      }
    }
    mounted() {
      this.getTreeNodeList()
      uni.$on('mainRefresh',(data)=>{
        if(data.page === 'workshop'){
          this.pullDownBool = true
          this.query.start = 0
          this.moreInfo = 'more'
          this.pullDownRefresh()
        }
      })
    }

    private goPage(treeNodeInfo:any){
      // if(treeNodeInfo.project_count>0){
      //   uni.navigateTo({
      //     url: `/pages/workshop/device_list?treeNodeId=${treeNodeInfo.id}`
      //   })
      // }else {
      //   uni.showToast({
      //     icon: 'none',
      //     title: '项目内暂无设备'
      //   })
      // }
    }

    public pullDownRefresh() {
      this.query.keywords = ''
      this.getTreeNodeList()
    }

    public loadMoreInfo(){
      console.log(22222)
      if(this.moreInfo !== 'more')return
      this.query.start = this.treeNodeList.length
      this.moreInfo = 'loading'
      this.getTreeNodeList()
    }

    public InputFocus(){

    }

    public InputBlur(){

    }

    public searchGoods(){
      this.query.start = 0
      this.moreInfo = 'more'
      this.getTreeNodeList()

    }

    public getTreeNodeList(){
      this.loadModal = true
      this.cloud.getTreeNode(this.query).then((res:any)=>{
        if(this.query.start === 0){
          this.treeNodeList = res.data
        }else {
          this.treeNodeList = [...this.treeNodeList,...res.data]
        }
        if (res.data && res.data.length === 0){
          this.moreInfo = 'nomore'
        }else {
          this.moreInfo = 'more'
        }
        if(this.pullDownBool){
          this.pullDownBool = false
        }
        this.loadModal = false
      }).finally(()=>{
        uni.stopPullDownRefresh()
        this.loadModal = false
      })
    }
  }
</script>

<style scoped>

</style>

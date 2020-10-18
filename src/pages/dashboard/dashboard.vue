<template>
  <view>
    <cu-custom bgColor="bg-gradual-green" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">报表管理</block>
    </cu-custom>
    <scroll-view scroll-y class="page">
      <common-chart :chart-data="arcbarOption" :init-chart-data="arcbarInitOption" canvas-id="arcbarChart" />
<!--      <ring v-if="ringData" :ringData="ringData"></ring>-->

      <view class="cu-list grid col-3" style="margin-top: 1px">
        <view class="cu-item" @click="showArcbar(item)" v-for="(item,index) in cuIconList" :key="index">
          <view class="text-blue">
            {{item.badge}}
          </view>
          <text>{{item.name}}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
  import Cloud from '../../utils/cloud'
  import Ring from '../../components/charts/ring.vue'
  import CommonChart from "@/components/charts/common_chart.vue";
  @Component({
    name: 'Dashboard',
    components: {
      CommonChart,
      Ring
    }
  })
  export default class extends Vue {
    private cloud = new Cloud()
    private query:any = {keywords: '', start:0}
    private pullDownBool:boolean = false
    private moreInfo:string = 'more'
    private loadModal:boolean = false
    private loadMoreText = {contentdown: "点我加载更多",contentrefresh: "正在加载...",contentnomore: "没有更多数据了"}
    private ringData = {
      title: '运行状态',
      data: [
        {
          "name": "运行",
          "data": 50
        }, {
          "name": "空闲",
          "data": 30
        }, {
          "name": "离线",
          "data": 20
        }]
    }

    private arcbarInitOption = {
      type: 'arcbar',
      fontSize:11,
      legend:{show:false},
      background:'#FFFFFF',
      pixelRatio: 1,
      series: [{"name":"正确率","data":0.29,"color":"#2fc25b"}],
      animation: true,
      width: uni.upx2px(750),
      height: uni.upx2px(500),
      dataLabel: true,
      title: {
        name: '告警',//这里我自动计算了，您可以直接给任意字符串
        color: "#2fc25b",
        fontSize: 25
      },
      subtitle: {
        name: '20',//这里您可以直接给任意字符串
        color: '#666666',
        fontSize: 15
      },
      extra: {
        arcbar:{
          type:'default',
          width: uni.upx2px(24)//圆弧的宽度
        }
      }
    }
    private arcbarOption:any = null

    showArcbar(e:any){
      this.arcbarOption = {
        title: {
          name: e.name
        },
        subtitle: {
          name: e.badge
        },
        "series":[{"name":e.name,"data":e.badge%100/100,"color":e.color}]
      }
    }
    get cuIconList(){
      return [
        {
          cuIcon: 'cardboardfill',
          color: 'green',
          badge: 350,
          name: '库存清单'
        }, {
          cuIcon: 'loading2',
          color: 'blue',
          badge: 33,
          name: '货品统计'
        }, {
          cuIcon: 'time',
          color: 'yellow',
          badge: 55,
          name: '出入库报表'
        }, {
          cuIcon: 'noticefill',
          color: 'red',
          badge: 34,
          name: '报损报表'
        }, {
          cuIcon: 'time',
          color: 'yellow',
          badge: 23,
          name: '退货报表'
        }, {
          cuIcon: 'noticefill',
          color: 'red',
          badge: 56,
          name: '客户报表'
        }, {
          cuIcon: 'time',
          color: 'yellow',
          badge: 78,
          name: '供应商报表'
        }, {
          cuIcon: 'noticefill',
          color: 'red',
          badge: 88,
          name: '台账记录'
        }, {
          cuIcon: 'time',
          color: 'yellow',
          badge: 500,
          name: '自定义报表'
        }]
    }


    mounted(){
      this.getDashboard()
      uni.$on('mainRefresh',(data)=>{
        if(data.page === 'dashboard'){
          this.pullDownBool = true
          this.query.start = 0
          this.pullDownRefresh()
        }
      })
    }
    private getDashboard(){
      this.loadModal = true
      this.cloud.getTask(this.query).then((res:any)=>{
        // you code
        if(this.pullDownBool){
          this.pullDownBool = false
        }
        this.loadModal = false
      }).finally(()=>{
        uni.stopPullDownRefresh()
        this.loadModal = false
      })
    }
    private pullDownRefresh() {
      this.query.keywords = ''
      this.getDashboard()
    }
  }
</script>

<style scoped>

</style>

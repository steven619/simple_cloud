<template>
  <view class="qiun-columns">
    <view class="qiun-bg-white qiun-title-bar qiun-common-mt" v-if="showTitle">
      <view class="qiun-title-dot-light">{{title}}</view>
    </view>
    <view class="qiun-charts" v-if="cid">
      <!--#ifdef MP-ALIPAY -->
      <canvas :canvas-id="cid" :id="cid"  class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}"></canvas>
      <!--#endif-->
      <!--#ifndef MP-ALIPAY -->
      <canvas :canvas-id="cid" :id="cid"  class="charts"></canvas>
      <!--#endif-->
    </view>
  </view>
</template>

<script>
  import uCharts from '@/components/u-charts/u-charts.js';
  import  { isJSON } from '@/common/checker.js';
  var canvaGauge={};

  export default {
    data() {
      return {
        cWidth:'',
        cHeight:'',
        pixelRatio:1,
        textarea:'',
        gaugeWidth:15,
        title: '',
        gaugeValue: 0,
        cid: null,
        type:'default'
      }
    },
    props: {
      gaugeData: {
        required: true,
        type: Object,
        default: ()=>{return {}}
      },
      showTitle: {
        required: false,
        type: Boolean,
        default: true
      },
      col: {
        required: false,
        type: Number,
        default: 1
      },
      max: {
        required: true,
        type: Number,
        default: 100
      }
    },
    onLoad() {
      //#ifdef MP-ALIPAY
      uni.getSystemInfo({
        success: function (res) {
          if(res.pixelRatio>1){
            //正常这里给2就行，如果pixelRatio=3性能会降低一点
            //this.pixelRatio =res.pixelRatio;
            this.pixelRatio =2;
          }
        }
      });
      //#endif
      this.cWidth=uni.upx2px(750)/this.col;
      this.cHeight=uni.upx2px(500)/this.col;
      this.getServerData();
    },
    destroyed(){
      canvaGauge={}
    },
    mounted(){
      this.init()
    },
    watch:{
      gaugeData: {
        handler(val, oldVal) {
          if(val !== oldVal){
            this.gaugeValue = (val.last_value.value)/100
            this.init()
          }
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      init(){
        this.title = this.gaugeData.name_zh
        this.cid = this.gaugeData.name
        if(this.cid){
          this.cWidth=uni.upx2px(750)/this.col;
          this.cHeight=uni.upx2px(500)/this.col;
          this.$nextTick(()=>{
            this.getServerData();
          })
        }
      },
      getServerData(){
        let Gauge = {
          "title": {
            "name": Math.round(this.gaugeValue*100)+''
          },
          "categories": [
            {
              "value": 0.2,
              "color": "#1890ff"
            },
            {
              "value": 0.8,
              "color": "#2fc25b"
            },
            {
              "value": 1,
              "color": "#f04864"
            }
          ],
          "series": [
            {
              "name": '',
              "data": this.gaugeValue/(this.max/100)
            }
          ]
        }
        this.showGauge(this.cid,Gauge);
      },
      showGauge(canvasId,chartData){
        let c = {
          $this:this,
          canvasId: canvasId,
          type: 'gauge',
          fontSize:11,
          legend:{show:false},
          title: {
            name: Math.round(chartData.title.name),
            color: chartData.categories[1].color,
            fontSize: 25*this.pixelRatio,
            offsetY:50*this.pixelRatio,//新增参数，自定义调整Y轴文案距离
          },
          subtitle: {
            name: chartData.series[0].name,
            color: '#666666',
            fontSize: 15*this.pixelRatio,
            offsetY:-50*this.pixelRatio,//新增参数，自定义调整Y轴文案距离
          },
          extra: {
            gauge:{
              type:'default',
              width: this.gaugeWidth*this.pixelRatio,//仪表盘背景的宽度
              startAngle:0.75,
              endAngle:0.25,
              startNumber:0,
              endNumber:this.max,
              splitLine:{
                fixRadius:0,
                splitNumber:10,
                width: this.gaugeWidth*this.pixelRatio,//仪表盘背景的宽度
                color:'#FFFFFF',
                childNumber:5,
                childWidth:this.gaugeWidth*0.4*this.pixelRatio,//仪表盘背景的宽度
              },
              pointer:{
                width: this.gaugeWidth*0.8*this.pixelRatio,//指针宽度
                color:'auto'
              }
            }
          },
          background:'#FFFFFF',
          pixelRatio:this.pixelRatio,
          categories: chartData.categories,
          series: chartData.series,
          animation: true,
          width: this.cWidth*this.pixelRatio,
          height: this.cHeight*this.pixelRatio,
          dataLabel: true,
        }
        if(!this.gaugeData || !this.gaugeData.name)return
        if(canvaGauge[this.gaugeData.name]){
          canvaGauge[this.gaugeData.name].updateData(chartData)
        }else {
          canvaGauge[this.gaugeData.name] = new uCharts(c);
        }
      }
    }
  }
</script>

<style>
  /*样式的width和height一定要与定义的cWidth和cHeight相对应*/
  .qiun-charts {
    width: 750rpx;
    height: 500rpx;
    background-color: #FFFFFF;
  }
  
  .charts {
    width: 750rpx;
    height: 500rpx;
    background-color: #FFFFFF;
  }
</style>

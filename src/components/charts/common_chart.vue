<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">{{title}}</view>
		</view>
		<view class="qiun-charts" >
			<canvas :canvas-id="canvasId" :id="canvasId" class="charts" @touchstart="touchRing"></canvas>
		</view>
	</view>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
  // @ts-ignore
	import uCharts from '@/components/u-charts/u-charts.js';
  // @ts-ignore
	import  { isJSON } from '@/common/checker';
	// var this;
	// var tcanvaChart=null;
  @Component({
    name: 'CommonChart',
    components: {
    }
  })
  export default class extends Vue {
  @Prop({required: false, default:()=>{return {}}}) private chartData!: any
  @Prop({required: true, default:()=>{return {}}}) private initChartData!: any
  @Prop({required: true, default:'canvasRing'}) private canvasId!: string
  @Prop({required: false, default:'图表'}) private title!: string
  @Prop({required: false, default:'arcbar'}) private type!: string

  private cWidth!:number
  private cHeight!:number
  private pixelRatio:number = 1
  private this:any = null
  private tcanvaChart:any = null

  onLoad() {
  }
  
  @Watch('chartData', { immediate: true, deep: true })
  chartDataChage(val:any, oldVal:any){
    if(val && val !== oldVal){
      console.log('upateCaart', val)
        this.tcanvaChart.updateData(val);
    }
  }
  
  mounted(){
    this.init()
  }
  init(){
    this.cWidth=uni.upx2px(750);
    this.cHeight=uni.upx2px(500);
    this.showChart(this.canvasId, this.initChartData)
    
  }
  showChart(canvasId:string,chartData:any){

    let op = JSON.parse(JSON.stringify(this.initChartData))
    op.$this = this
    op.canvasId = this.canvasId
    op.type = this.type

    this.tcanvaChart=new uCharts(op);
  }
  touchRing(e:any){
    this.tcanvaChart.touchLegend(e, {
      animation : false
    });
    this.tcanvaChart.showToolTip(e, {
      format: function (item:any) {
        return item.name + ':' + item.data
      }
    });
  }
	}
</script>

<style scoped>
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

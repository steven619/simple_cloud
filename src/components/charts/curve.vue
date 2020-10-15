<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">{{title}}</view>
		</view>
		<view class="qiun-charts"  v-if="cid">
			<canvas :canvas-id="cid" :id="cid" class="charts"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import  { isJSON } from '@/common/checker';
	var canvaRing=null;
 
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:'',
        title: '',
        // cid: `woody${Math.random().toString(36).slice(-8)}`,
        cid: null,
        ts: [],
        series: []
        
			}
		},

    props: {
      curveData: {
        required: true,
        type: Object,
        default: ()=>{return {}}
      }
		},
    onUnload(){
    },
		onLoad() {
		},
    destroyed(){
      canvaRing=null
    },
    mounted(){
      this.init()
    },
    watch:{
      curveData: {
        handler(val, oldVal) {
          if(val !== oldVal){
            this.ts.push(new Date(val.last_value.ts).toLocaleTimeString())
            this.ts = this.ts.slice(-10)
            let o = []
            val.last_value.value.forEach((k)=>{
              o.push({name: k.axis, data:[k.value]})
              this.series.forEach((p,j)=>{
                if(p.name === k.axis){
                  this.series[j].data.push(k.value)
                }
                this.series[j].data = this.series[j].data.slice(-10)
              })
            })
            if(this.series.length === 0){
              this.series = o
            }
            this.init()
            // canvaRing && canvaRing.updateData(this.lineData)
          }
        },
        immediate: true,
        deep: true
      }
    },
    computed:{
      lineData(){
        return {
          "categories": this.ts,
          "series": this.series
        }
      }
    },
		methods: {
		  init(){
        this.title = this.curveData.name_zh
        this.cid = this.curveData.cid
		    if(this.cid){
          this.cWidth=uni.upx2px(750);
          this.cHeight=uni.upx2px(500);
          this.$nextTick(()=>{
            this.getServerData();
          })
        }
      },
      
			getServerData(){
		    this.$nextTick()
        this.showRing(this.cid,this.lineData);
			},
			showRing(canvasId,chartData){
		    canvaRing = new uCharts({
          $this:this,
          canvasId: canvasId,
          type: 'line',
          fontSize:11,
          padding:[15,20,0,15],
          legend:{
            show:true,
            padding:5,
            lineHeight:11,
            margin:0,
          },
          dataLabel:true,
          dataPointShape:true,
          background:'#FFFFFF',
          pixelRatio:this.pixelRatio,
          categories: chartData.categories,
          series: chartData.series,
          animation: false,
          xAxis: {
            type:'grid',
            gridColor:'#CCCCCC',
            gridType:'dash',
            dashLength:8,
            scrollShow:true,
            disabled: true,
            disableGrid: true,
            boundaryGap:'justify'
          },
          yAxis: {
            gridType:'dash',
            gridColor:'#CCCCCC',
            dashLength:8,
            splitNumber:5
          },
          width: this.cWidth*this.pixelRatio,
          height: this.cHeight*this.pixelRatio,
          extra: {
            line:{
              type: 'curve'
            }
          }
        });
			},
			touchRing(e){
				canvaRing.touchLegend(e, {
					animation : false
				});
				canvaRing.showToolTip(e, {
					format: (item) => {
						return item.name + ':' + item.data
					}
				});
			},
			changeData(){
				if(isJSON(this.textarea)){
					let newdata=JSON.parse(this.textarea);
					canvaRing.updateData({
						series: newdata.series,
						categories: newdata.categories
					});
				}else{
					uni.showToast({
						title:'数据格式错误',
						image:'../../../../static/images/alert-warning.png'
					})
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

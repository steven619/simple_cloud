<template>
  <view v-if="gcodeData.cnc_setfspeed">
    <view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
      <view class="qiun-title-dot-light">模态信息</view>
    </view>
    <view class="flex-direction bg-white" style="display: flex; flex-direction: row">
      <view class="cu-list grid col-3" style="margin-top: 1px;flex: 3;">
        <view v-for="(item,index) in gcode" :key="index">
          <view class="text-blue margin-xs">
            {{item}}
          </view>
        </view>
      </view>
      <view  class="cu-item text-green gcode-right">
        <view>F:{{' '+gcodeData.cnc_setfspeed.last_value.value||''}}</view>
        <view>S:{{' '+gcodeData.cnc_setspeed.last_value.value||''}}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    @Component({
        name: 'GcodeCard',
        components: {
        }
    })
    export default class extends Vue {
        @Prop({required: true, default:null}) private gcodeData!: any
      
      mounted(){
      }
      
      
      get gcode(){
          if(this.gcodeData
              && this.gcodeData.cnc_gcode
              && this.gcodeData.cnc_gcode.last_value
              && this.gcodeData.cnc_gcode.last_value.value){
            let k = this.gcodeData.cnc_gcode.last_value.value.split('/').filter((e:string)=>{return !!e})
            return k
          }else
          return ['--']
      }
      
    }
</script>

<style scoped>
.gcode-right{
  margin: auto;
  flex: 2;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>

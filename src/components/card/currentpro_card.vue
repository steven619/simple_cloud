<template>
  <view>
    <view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
      <view class="qiun-title-dot-light">当前执行程序</view>
    </view>
      <view class="cu-list bg-white padding-xs" style="margin-top: 1px;text-align: center;">
        <view v-for="(item,index) in currentpro" :key="index">
          <view class="text-blue margin-xs">
            <text :class="index===1?'text-red':''">{{item}}</text>
          </view>
        </view>
      </view>
  </view>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator'
  @Component({
    name: 'CurrentproCard',
    components: {
    }
  })
  export default class extends Vue {
    @Prop({required: true, default:null}) private currentproData!: any

    get currentpro(){
      if(this.currentproData
          && this.currentproData.last_value
          &&  this.currentproData.last_value.value){
        let k = this.currentproData.last_value.value.split('\n').filter((e:string)=>{return !!e}).slice(0,10)
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

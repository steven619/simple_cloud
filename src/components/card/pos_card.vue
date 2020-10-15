<template>
  <view>
    <view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
      <view class="qiun-title-dot-light">坐标信息</view>
    </view>
    <view class="cu-list grid col-2" style="margin-top: 1px">
      <view class="cu-item" v-for="(item,index) in posData" :key="index">
        <view class="text-blue">
          {{item.name_zh}}
        </view>
        <view v-for="(v,index) in (item.last_value && item.last_value.value)" :key="index">
          <text class="text-blue">{{v.axis?v.axis:'--'+'  '}}:{{'  ' + v.value!==undefined?v.value:'--'}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    @Component({
        name: 'PosCard',
        components: {
        }
    })
    export default class extends Vue {
        @Prop({required: true, default:null}) private posData!: object
      
      mounted(){
      }
      
    }
</script>

<style scoped>

</style>

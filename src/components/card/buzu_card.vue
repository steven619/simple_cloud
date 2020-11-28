<template>
    <view v-if="taskInfo">
      <view class="cu-list menu sm-border">
          <view class="cu-bar bg-white solid-bottom margin-top-xs action">
              <text class="cuIcon-titles text-green"></text> {{taskInfo.name}}修生羊毛大衣
            <view class="action">
              <view class="cu-capsule round cu-tag bg-red" >
                  不足
              </view>
            </view>
        </view>
        <view class="cu-card case" >
          <view class="cu-item shadow">
            <view class="image">
              <image style="background-image:url(../../../../static/images/x6.webp);"
                     mode="widthFix"></image>
              <view class="cu-tag bg-blue">合格</view>
            </view>
          </view>
        </view>
        <view class="flex">
          <view class="flex-sub bg-white  padding-sm margin-xs radius">数量：{{taskInfo.shuliang}}</view>
          <view class="flex-sub bg-white padding-sm margin-xs radius">品牌：（{{taskInfo.pingpai}}）</view>
        </view>
        <view class="flex">
          <view class="flex-sub bg-white padding-sm margin-xs radius">单价：{{taskInfo.danjia}}元</view>
          <view class="flex-sub bg-white padding-sm margin-xs radius">金额：{{taskInfo.danjia*taskInfo.shuliang}}元</view>
        </view>
        <view class="flex">
          <view class="flex-sub bg-white padding-sm margin-xs radius">调拨人：{{taskInfo.diaoboren}}</view>
          <view class="flex-sub bg-white padding-sm margin-xs radius">型号：（X-{{taskInfo.xinghao}}）</view>
        </view>
        <view class="basis-xl bg-grey margin-xs padding-sm radius">单据编号：{{taskInfo.danjubianhao}}</view>
        <view class="basis-xl bg-grey margin-xs padding-sm radius">调拨时间：{{taskInfo.diaoboshijian}}</view>
      </view>
    </view>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import UploadImage from "@/components/card/upload-img.vue";
    @Component({
        name: 'BuzuCard',
        components: {
          UploadImage
        }
    })
    export default class extends Vue {
        @Prop({required: false, default:()=>{return {}}}) private taskInfo!: object
    }


</script>

<style scoped>

</style>

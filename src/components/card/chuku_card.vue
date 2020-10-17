<template>
    <view v-if="taskInfo">
      <view class="cu-list menu sm-border">
          <view class="cu-bar bg-white solid-bottom margin-top-xs action">
              <text class="cuIcon-titles text-green"></text> {{taskInfo.name}}
            <view class="action">
              <view class="cu-capsule round cu-tag bg-red" >
                  已出库
              </view>
            </view>
        </view>
        <view class="cu-card case" >
          <view class="cu-item shadow">
            <view class="image">
              <image style="background-image:url(../../../../static/images/moren.jpg);"
                     mode="widthFix"></image>
              <view class="cu-tag bg-blue">合格</view>
            </view>
          </view>
        </view>
        <view class="flex">
          <view class="flex-sub bg-white padding-sm margin-xs radius">数量：{{taskInfo.shuliang}}</view>
          <view class="flex-sub bg-white padding-sm margin-xs radius">品牌：（{{taskInfo.pingpai}}）</view>
        </view>
        <view class="flex">
          <view class="flex-sub bg-white padding-sm margin-xs radius">供应商：{{taskInfo.gongyinshang}}有限公司</view>
          <view class="flex-sub bg-white padding-sm margin-xs radius">型号：（X-{{taskInfo.xinghao}}）</view>
        </view>
        <view class="flex">
          <view class="flex-sub bg-white padding-sm margin-xs radius">单据编号：{{taskInfo.danjubianhao}}</view>
          <view class="flex-sub bg-white padding-sm margin-xs radius">仓库：第{{taskInfo.cangku}}号</view>
        </view>
        <view class="basis-xl bg-grey margin-xs padding-sm radius">业务时间：{{taskInfo.yewushijian}}</view>
      </view>
    </view>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import UploadImage from "@/components/card/upload-img.vue";
    @Component({
        name: 'ChukuCard',
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

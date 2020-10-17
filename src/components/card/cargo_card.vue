<template>
    <view v-if="taskInfo">
      <view class="cu-list menu sm-border">
          <view class="cu-item shadow">
            <view class="image">
<!--              :src=taskInfo.img-->
              <image style="background-image:url(../../../../static/images/xuanze.png);"
                     mode="widthFix"></image>
              <view class="cu-tag bg-blue">充足</view>
            </view>
          </view>
          <view class="cu-bar bg-white solid-bottom margin-top-xs">

            <view class="action">
              <text class="cuIcon-titles text-green"></text> {{taskInfo.name}}
            </view>
            <view class="action">
              <view class="cu-capsule round" @click="$emit('showTaskInfo', taskInfo)">
                <view class='cu-tag bg-green '>
                  分享
                </view>
              </view>
            </view>
        </view>
        <view class="padding bg-white">
          <view class="flex  p-xs margin-bottom-sm mb-sm">
            <view class="flex-twice bg-green padding-sm margin-xs radius">可用库存</view>
            <view class="flex-twice bg-blue padding-sm margin-xs radius">待入库</view>
            <view class="flex-twice bg-green padding-sm margin-xs radius">待出库</view>
            <view class="flex-twice bg-blue padding-sm margin-xs radius">库存量</view>
          </view>
          <view class="flex  p-xs margin-bottom-sm mb-sm">
            <view class="flex-twice bg-green padding-sm margin-xs radius">{{taskInfo.keyongkucun}}</view>
            <view class="flex-twice bg-blue padding-sm margin-xs radius">{{taskInfo.dairuku}}</view>
            <view class="flex-twice bg-green padding-sm margin-xs radius">{{taskInfo.daichuku}}</view>
            <view class="flex-twice bg-blue padding-sm margin-xs radius">{{taskInfo.kucunliang}}</view>
          </view>
          <view class="flex  p-xs margin-bottom-sm mb-sm">
            <view class="flex-twice bg-blue padding-sm margin-xs radius">采购价</view>
            <view class="flex-twice bg-blue padding-sm margin-xs radius">批发价</view>
            <view class="flex-twice bg-blue padding-sm margin-xs radius">零售价</view>
          </view>
          <view class="flex  p-xs margin-bottom-sm mb-sm">
            <view class="flex-twice text-price bg-gradual-red padding-sm margin-xs radius">{{taskInfo.caigoujia}}</view>
            <view class="flex-twice text-price bg-gradual-red padding-sm margin-xs radius">{{taskInfo.pifajia}}</view>
            <view class="flex-twice text-price bg-gradual-red padding-sm margin-xs radius">{{taskInfo.lingshoujia}}</view>
          </view>
        </view>
      </view>
    </view>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import UploadImage from "@/components/card/upload-img.vue";
    @Component({
        name: 'CargoCard',
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

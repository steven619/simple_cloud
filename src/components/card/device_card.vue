<template>
    <view v-if="deviceInfo">
      <view class="cu-list menu sm-border">
        <view class="cu-bar bg-white solid-bottom margin-top-xs">
            <view class="action">
                <text class="cuIcon-titles text-orange "></text> {{deviceInfo.name}}
            </view>
  
          <view class="action">
            <view class="cu-capsule round">
              <view class='cu-tag bg-green '>
                状态
              </view>
              <view class="cu-tag line-blue">
                {{deviceInfo.status}}
              </view>
            </view>
          </view>
        </view>
  
        <view class="cu-item" style="margin-top: 1px;">
          <view class="content">
            <text class="cuIcon-stop text-brown"></text>
            <text class="text-grey">今日产量</text>
          </view>
          <view class="action">
            <text class="text-grey">{{deviceInfo.today_products}}</text>
          </view>
        </view>
        <view class="cu-item">
          <view class="content">
            <text class="cuIcon-all text-green"></text>
            <text class="text-grey">本周产量</text>
          </view>
          <view class="action">
            <text class="text-grey">{{deviceInfo.week_products}}</text>
          </view>
        </view>
      </view>
    </view>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    @Component({
        name: 'deviceCard',
        components: {
        }
    })
    export default class extends Vue {
        @Prop({required: false, default:()=>{return {}}}) private deviceInfo!: object
    }
</script>

<style scoped>

</style>

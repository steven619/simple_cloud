<template>
    <view>
      <cu-custom bgImage="/static/images/bar2.jpg" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">在线打卡</block>
        </cu-custom>
      <view class="solids-bottom padding-xs flex align-center">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xsl padding">
            <image src="/static/images/daka.jpeg" mode="widthFix" class="response"></image>
          </view>
          <view class="padding text-black text-bold">一定要坚持打卡！！！</view>
        </view>
      </view>
      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action">
          <text class="cuIcon-title text-orange"></text> 本月打卡
        </view>
        <view class="action">
          <button class="cu-btn bg-green shadow" @tap="ScrollSteps">打卡</button>
        </view>
      </view>
      <scroll-view scroll-x class="bg-white padding response cu-steps steps-bottom" :scroll-into-view="'scroll-' + scroll"
                   scroll-with-animation>
        <view class="cu-item padding-lr-xl" :class="index>scroll?'':'text-blue'" v-for="(item,index) in 10" :key="index" :id="'scroll-' + index">
          Level {{index + 1}} 号<text class="num" :data-index="index + 1"></text>
        </view>
      </scroll-view>
    </view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component({
        name: 'DaKa',
        components: {
        }
    })
    export default class extends Vue {
      private num:number= 0
      private scroll:number= 0
     private ScrollSteps() {
        this.scroll= this.scroll == 9 ? 0 : this.scroll + 1
      }

    }
</script>
<style scoped>

</style>


<template>
  <view>
    <cu-custom bgColor="bg-gradual-green" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">首页</block>
    </cu-custom>
<!--    广告区-->
    <swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
            :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
            indicator-active-color="#0081ff">
      <swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
        <view class="swiper-item">
          <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
          <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
        </view>
      </swiper-item>
    </swiper>
    <view class="cu-timeline">
      <view class="cu-time">06-17</view>
      <view class="cu-item">
        <view class="content">
          <text>01:30</text> 【喵星】 MX-12138 已揽收，准备发往银河系
        </view>
      </view>
    </view>

    <view class="cu-timeline">
      <view class="cu-time">06-17</view>
      <view class="cu-item">
        <view class="content">
          <view class="cu-capsule radius">
            <view class="cu-tag bg-cyan">上午</view>
            <view class="cu-tag line-cyan">10:00</view>
          </view>
          <view class="margin-top">这是第一次，我家的铲屎官走了这么久。久到足足有三天！！ 在听到他的脚步声响在楼梯间的那一刻，我简直想要破门而出，对着他狠狠地吼上10分钟，然后再看心情要不要他进门。</view>
        </view>
      </view>
      <view class="cu-item text-blue">
        <view class="bg-blue shadow-blur content">
          <view class="cu-list menu-avatar radius">
            <view class="cu-item">
              <view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
              <view class="content">
                <view class="text-grey">文晓港</view>
                <view class="text-gray text-sm">
                  <text class="cuIcon-infofill text-red"></text> 消息未送达</view>
              </view>
              <view class="action">
                <view class="text-grey text-xs">22:20</view>
                <view class="cu-tag round bg-grey sm">5</view>
              </view>
            </view>
            <view class="cu-item">
              <view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
                <view class="cu-tag badge">99+</view>
              </view>
              <view class="content">
                <view class="text-grey">文晓港
                  <view class="cu-tag round orange sm">SVIP</view>
                </view>
                <view class="text-gray text-sm">
                  <text class="cuIcon-redpacket_fill text-red"></text> 收到红包</view>
              </view>
              <view class="action">
                <view class="text-grey text-xs">22:20</view>
                <text class="cuIcon-notice_forbid_fill text-gray"></text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Ring from '../../components/charts/ring.vue'
  import CommonChart from "@/components/charts/common_chart.vue";

  @Component({
    name: 'BaoBiao',
    components: {
      CommonChart,
      Ring
    },
  }
  )
  export default class extends Vue {
    private dotStyle: boolean = false
    private cardCur:any = ''
    private swiperList: any[] = [{
      id: 0,
      type: 'image',
      url: '/static/images/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: '/static/images/big37006.jpg',
    }, {
      id: 2,
      type: 'image',
      url: '/static/images/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: '/static/images/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: '/static/images/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: '/static/images/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: '/static/images/big99008.jpg'
    }]
    private cardSwiper(e:any) {
      this.cardCur = e.detail.current
    }
  }



</script>

<style scoped>
.page {
  height: 100vh;
}
</style>

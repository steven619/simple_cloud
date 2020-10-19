<template>
  <view>
   <cu-custom bgImage="/static/images/bar2.jpg" >
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
      <view class="cu-time">昨天</view>
      <view class="cu-item">
        <view class="content">
          <view class="cu-capsule radius">
            <view class="cu-tag bg-cyan">上午</view>
            <view class="cu-tag line-cyan">06:00</view>
          </view>  【管理员杨旭】 MX-12138 已揽收，准备发往银河系仓库
        </view>
      </view>
    </view>
    <view class="cu-timeline">
      <view class="cu-time">昨天</view>
      <view class="cu-item">
        <view class="content">
          <view class="cu-capsule radius">
            <view class="cu-tag bg-cyan">上午</view>
            <view class="cu-tag line-cyan">06:00</view>
          </view> 【客户小明】 MX-12138 已揽收，编号为{0558652356689}
        </view>
      </view>
    </view>
    <view class="cu-timeline">
      <view class="cu-time">昨天</view>
      <view class="cu-item">
        <view class="content">
          <view class="cu-capsule radius">
            <view class="cu-tag bg-cyan">上午</view>
            <view class="cu-tag line-cyan">10:00</view>
          </view> 【管理员杨旭】 MX-12138 已揽收，准备发往银河系仓库
        </view>
      </view>
    </view>

    <view class="cu-timeline">
      <view class="cu-time">06-17</view>
      <view class="cu-item">
        <view class="content">
          <view class="cu-capsule radius">
            <view class="cu-tag bg-cyan">上午</view>
            <view class="cu-tag line-cyan">11:00</view>
          </view>
          <view class="margin-top">这是第一次，我家的铲屎官走了这么久。久到足足有三天！！ 在听到他的脚步声响在楼梯间的那一刻，我简直想要破门而出，对着他狠狠地吼上10分钟，然后再看心情要不要他进门。</view>
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
      url: '/static/images/g01.jpeg'
    }, {
      id: 1,
      type: 'image',
      url: '/static/images/g02.png',
    }, {
      id: 2,
      type: 'image',
      url: '/static/images/g03.jpg'
    }, {
      id: 3,
      type: 'image',
      url: '/static/images/g04.jpg'
    }, {
      id: 4,
      type: 'image',
      url: '/static/images/g05.jpg'
    }, {
      id: 5,
      type: 'image',
      url: '/static/images/g06.jpg'
    }, {
      id: 6,
      type: 'image',
      url: '/static/images/g07.jpg'
    }]
    private cardSwiper(e:any) {
      this.cardCur = e.detail.current
    }
  }



</script>

<style scoped>
.page {
  height: 130vh;
}
</style>

<template>
  <view>
    <cu-custom bgColor="bg-gradual-green" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">首页</block>
    </cu-custom>
<!--    广告区-->
    <view class="cu-bar bg-white">
      <view class="action">
        <text class="cuIcon-title text-pink"></text> 广告区
      </view>

    </view>
    <swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
            :autoplay="true" interval="5000" duration="500">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
        <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
      </swiper-item>
    </swiper>


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
  })
  export default class extends Vue {
    private dotStyle:boolean=false
    private swiperList: any[] = [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }]
  }

</script>

<style scoped>

</style>

<template  >
	<view>
    <cu-custom bgImage="/static/images/bar3.jpg" >
      <block slot="content">生意圈</block>
    </cu-custom>
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
    <scroll-view scroll-y class="page">
      <view class="nav-list">
        <navigator hover-class='none' :url="'/pages/dashboard/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
                   :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
          <view class="nav-title">{{item.title}}</view>
          <view class="nav-name">{{item.name}}</view>
          <text :class="'cuIcon-' + item.cuIcon"></text>
        </navigator>
      </view>
      <view class="cu-tabbar-height"></view>
    </scroll-view>
	</view>
</template>

<script>


  export default {
    name: "Home",
    components: {},
    data() {
      return {
        cardCur:'',
        dotStyle: false,
        swiperList: [{
          id: 0,
          type: 'image',
          url: '/static/images/x1.webp'
        }, {
          id: 1,
          type: 'image',
          url: '/static/images/x2.webp',
        }, {
          id: 2,
          type: 'image',
          url: '/static/images/x3.webp'
        }, {
          id: 3,
          type: 'image',
          url: '/static/images/x4.webp'
        }, {
          id: 4,
          type: 'image',
          url: '/static/images/x5.webp'
        }, {
          id: 5,
          type: 'image',
          url: '/static/images/x6.webp'
        }, {
          id: 6,
          type: 'image',
          url: '/static/images/x7.webp'
        }],
        elements: [
          {
            title: '商品明细',
            name: 'cargo',
            color: 'orange',
            cuIcon: 'formfill'
          },
            {
          title: '入库明细',
          name: 'ruku',
          color: 'blue',
          cuIcon: 'formfill'
        },
          {
            title: '出库明细',
            name: 'chuku',
            color: 'mauve',
            cuIcon: 'formfill'
          },
          {
            title: '调拨明细',
            name: 'mingxi',
            color: 'olive',
            cuIcon: 'copy'
          },
          {
            title: '在线论坛',
            name: 'chat',
            color: 'green',
            cuIcon: 'messagefill'
          },
          {
            title: '更多功能',
            name: 'gengduo',
            color: 'red',
            cuIcon: 'copy'
          }
        ],
      };
    },
    methods:{
      onShow() {
        console.log("success")
      },
      openPage(e){
        console.log(e,9999)
        // var newsid = e.currentTarget.dataset.newsid;
        uni.navigateTo({
          url: '/pages/dashboard/'+e.target.dataset.name
        });
      },
      cardSwiper(e) {
        this.cardCur = e.detail.current
      }
    }


  }

</script>

<style>
.page {
  height: 60vh;
}
</style>

<template>
  <view>
    <cu-custom bgImage="/static/images/bar2.jpg" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">新闻详细</block>
    </cu-custom>
    <view class="content">
      <view class="title">{{title}}...</view>
      <view class="art-content">
        <rich-text class="richText" :nodes="strings"></rich-text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      strings : ''
    };
  },
  methods: {
    onLoad:function(e){
      console.log(e);
      uni.request({
        url: 'https://unidemo.dcloud.net.cn/api/news/36kr/'+e.newsid,
        method: 'GET',
        data: {},
        success: res => {
          console.log(res);
          this.title = res.data.title;
          this.strings = res.data.content;
        },
        fail: () => {},
        complete: () => {}
      });
    }
  }
}
</script>

<style>
.cu-form-group .title {
  min-width: calc(4em + 15px);
}
.content{padding:10upx 2%; width: 96%; flex-wrap:wrap;}
.title{line-height:2em; font-weight:700; font-size:38upx;}
.art-content{line-height:2em;}
</style>

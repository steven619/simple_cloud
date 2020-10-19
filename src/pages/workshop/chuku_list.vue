<template>
  <view>
    <cu-custom bgImage="/static/images/bar2.jpg" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">出库表单</block>
    </cu-custom>
    <form>
      <view class="cu-form-group margin-top">
        <view class="title">商品名</view>
        <input placeholder="例如：小米音箱" name="input"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">品牌</view>
        <input placeholder="例如：小米" name="input"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">型号</view>
        <input placeholder="例如：S-666" name="input"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">数量</view>
        <input placeholder="整数" name="input"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">仓库</view>
        <input placeholder="例如：第10号" name="input"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">单据编号</view>
        <input placeholder="填写正确！！！" name="input"></input>
      </view>
      <view class="cu-bar bg-white margin-top">
        <view class="action">
          图片上传
        </view>
        <view class="action">
          {{imgList.length}}/4
        </view>
      </view>
      <view class="cu-form-group">
        <view class="grid col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
            <image :src="imgList[index]" mode="aspectFill"></image>
            <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
              <text class='cuIcon-close'></text>
            </view>
          </view>
          <view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
            <text class='cuIcon-cameraadd'></text>
          </view>
        </view>
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">供应商</view>
        <picker @change="PickerChange" :value="index" :range="picker">
          <view class="picker">
            {{index>-1?picker[index]:'没有贵公司名字，请联系工作人员'}}
          </view>
        </picker>
      </view>
      <!-- #endif -->
      <view class="cu-form-group">
        <view class="title">时间选择</view>
        <picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange">
          <view class="picker">
            {{time}}
          </view>
        </picker>
      </view>
      <view class="cu-form-group">
        <view class="title">日期选择</view>
        <picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
          <view class="picker">
            {{date}}
          </view>
        </picker>
      </view>
      <!-- #ifndef H5 || APP-PLUS || MP-ALIPAY -->
      <view class="cu-form-group">
        <view class="title">地址选择</view>
        <picker mode="region" @change="RegionChange" :value="region">
          <view class="picker">
            {{region[0]}}，{{region[1]}}，{{region[2]}}
          </view>
        </picker>
      </view>
      <view class="cu-form-group align-start">
        <view class="title">商品描述</view>
        <textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" placeholder="多行文本输入框"></textarea>
        <button class="padding-xl cu-btn block bg-blue margin-tb-sm lg" @tap="getlist">
          <text class="cuIcon-loading3 cuIconfont-spin"></text> 提交</button>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      index: -1,
      picker: ['巫迪科技有限公司', '长城科技有限公司', '金鑫科技有限公司'],
      time: '12:01',
      date: '2018-12-25',
      region: ['宁夏省', '银川市', '金凤区'],
      imgList: [],
      modalName: null
    };
  },
  methods: {
    getlist(){
      uni.navigateTo({
        url: '/pages/index/index'
      });
    },
    TimeChange(e) {
      this.time = e.detail.value
    },
    DateChange(e) {
      this.date = e.detail.value
    },
    RegionChange(e) {
      this.region = e.detail.value
    },
    ChooseImage() {
      uni.chooseImage({
        count: 4, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          if (this.imgList.length != 0) {
            this.imgList = this.imgList.concat(res.tempFilePaths)
          } else {
            this.imgList = res.tempFilePaths
          }
        }
      });
    },
    ViewImage(e) {
      uni.previewImage({
        urls: this.imgList,
        current: e.currentTarget.dataset.url
      });
    },
    DelImg(e) {
      uni.showModal({
        title: '召唤师',
        content: '确定要删除这段回忆吗？',
        cancelText: '再看看',
        confirmText: '再见',
        success: res => {
          if (res.confirm) {
            this.imgList.splice(e.currentTarget.dataset.index, 1)
          }
        }
      })
    },
    textareaBInput(e) {
      this.textareaBValue = e.detail.value
    },
    PickerChange(e) {
      this.index = e.detail.value
    },
  }
}
</script>

<style>
.cu-form-group .title {
  min-width: calc(4em + 15px);
}
</style>

<template>
    <view>
        <cu-custom bgColor="bg-gradual-green" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">反馈意见</block>
        </cu-custom>
      <view class="solids-bottom padding-xs flex align-center">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xsl padding">
            <image src="/static/images/fankui.jpg" mode="widthFix" class="response"></image>
          </view>
          <view class="padding text-black text-bold">一定要坚持打卡！！！</view>
        </view>
      </view>
      <form>
        <view class="cu-form-group margin-top">
          <view class="title">姓名</view>
          <input placeholder="您的名字" name="input"></input>
        </view>
        <view class="cu-form-group">
          <view class="title">QQ</view>
          <input placeholder="QQ号" name="input"></input>
        </view>
        <view class="cu-form-group">
          <view class="title">手机号码</view>
          <input placeholder="手机号" name="input"></input>
          <view class="cu-capsule radius">
            <view class='cu-tag bg-blue '>
              +86
            </view>
            <view class="cu-tag line-blue">
              中国大陆
            </view>
          </view>
        </view>
          <view class="cu-form-group margin-top">
            <view class="title">意见种类</view>
            <picker @change="PickerChange" :value="index" :range="picker">
              <view class="picker">
                {{index>-1?picker[index]:'您的意见范围'}}
              </view>
            </picker>
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
          <view class="cu-form-group align-start">
            <view class="title">意见反馈</view>
            <textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" placeholder="多行文本输入框"></textarea>
            <button class="padding-xl cu-btn block bg-blue margin-tb-sm lg" @tap="getlist">
              <text class="cuIcon-loading3 cuIconfont-spin"></text> 提交</button>
          </view>
      </form>


    </view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component({
        name: 'FanKui',
        components: {
        },
    })
    export default class extends Vue {
      private index:number= -1
      private picker:any[]= ['加油', '再加油', '好好加油']
      private imgList:any[]= []
      private modalName:any= null
      private PickerChange(e:any) {
        this.index = e.detail.value
      }
      private ChooseImage() {
        uni.chooseImage({
          count: 4, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
          success: (res) => {
            if (this.imgList.length != 0) {
              this.imgList = this.imgList.concat(res.tempFilePaths)
            }
          }
        });
      }
      private ViewImage(e:any) {
        uni.previewImage({
          urls: this.imgList,
          current: e.currentTarget.dataset.url
        });
      }
      getlist(){

        uni.navigateTo({
          url: '/pages/index/index'
        });
      }
     private DelImg(e:any) {
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
      }
      private textareaBValue:any=''
      private textareaBInput(e:any) {
        this.textareaBValue = e.detail.value
      }
    }
</script>
<style scoped>
.cu-form-group .title {
  min-width: calc(4em + 15px);
}
</style>


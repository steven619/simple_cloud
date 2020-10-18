<template>
  <view>
    <scroll-view scroll-y class="scrollPage">
      <view class="UCenter-bg bg-green" v-if="userInfo">
        <image :src="cloud.getBaseUrl(userInfo && userInfo.avatar)"
               class="cu-avatar xl round"
               mode="widthFix"></image>
        <view class="text-xl">
          <text>{{userInfo.name||''}}</text>
        </view>
        <image src="https://nxcxwlkj.com/download/wave.gif" mode="scaleToFill" class="gif-wave"></image>
      </view>
      <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius sm-border">
        <view class="cu-item arrow">
          <navigator class="content" url="/pages/personal_center/user_info" hover-class="none">
            <text class="cuIcon-info text-blue"></text>
            <text class="text-grey">个人信息</text>
          </navigator>
        </view>
        <view class="cu-item arrow">
          <navigator class="content" url="/pages/dashboard/fankui" hover-class="none">
            <text class="cuIcon-writefill text-blue"></text>
            <text class="text-grey">反馈意见</text>
          </navigator>
        </view>
        <view class="cu-item arrow">
          <navigator class="content" url="/pages/dashboard/fenxiang" hover-class="none">
            <text class="cuIcon-redpacket text-blue"></text>
            <text class="text-grey">邀请有礼</text>
          </navigator>
        </view>
        <view class="cu-item arrow">
          <navigator class="content" url="/pages/dashboard/daka" hover-class="none">
            <text class="cuIcon-font text-blue"></text>
            <text class="text-grey">在线打卡</text>
          </navigator>
        </view>

        <view class="padding-left padding-right flex flex-direction">
          <button class="cu-btn bg-red round margin-tb-sm xl" @click="logOutConfirm">退出登陆</button>
        </view>
      </view>
    </scroll-view>
    <view class="cu-tabbar-height"></view>

    <confirm-message :show="modalName=='logout'"
                     message="确定要退出登陆吗?"
                     @cancel="modalName=''"
                     @confirm="logOut"></confirm-message>
  </view>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
  import Cloud from '../../utils/cloud'
  import service from "@/service";
  import Home from "@/pages/dashboard/home.vue";
  @Component({
    name: 'PersonalCenter',
    components: {
      Home
    }
  })
  export default class extends Vue {
    private cloud = new Cloud()
    private userInfo:object = {avatar:''}
    private pullDownBool:boolean = false
    private modalName:string = ''
    mounted() {
      this.getUserInfo()
      uni.$on('mainRefresh',(data)=>{
        if(data.page === 'personal-center'){
          this.pullDownBool = true
          this.pullDownRefresh()
        }
      })
    }

    private pullDownRefresh(){
      this.getUserInfo()
    }

    private logOutConfirm(){
      console.log(this.modalName)
      this.modalName = 'logout'
    }

    private logOut(){
      service.setToken('')
      uni.reLaunch({
        url: '../login/login',
      });
    }

    private getUserInfo(){
      this.cloud.getUserInfo().then((res:any)=>{
        this.userInfo = res.data
        if(this.pullDownBool){
          uni.stopPullDownRefresh()
          this.pullDownBool = false
        }
      })
    }

  }
</script>

<style scoped>
  .UCenter-bg {
    /*background-image: url(https://image.weilanwl.com/color2.0/index.jpg);*/
    background-size: cover;
    height: 550rpx;
    display: flex;
    justify-content: center;
    padding-top: 40rpx;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-weight: 300;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  }

  .UCenter-bg text {
    opacity: 0.8;
  }

  .UCenter-bg image {
    width: 200rpx;
    height: 200rpx;
  }

  .UCenter-bg .gif-wave{
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 99;
    mix-blend-mode: screen;
    height: 100rpx;
  }
</style>

<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
      mpType: 'app',
      mounted() {
        uni.getSystemInfo({
          success: function(e:any){
            // #ifndef MP
            Vue.prototype.StatusBar = e.statusBarHeight;
            if (e.platform == 'android') {
              Vue.prototype.CustomBar = e.statusBarHeight + 50;
            } else {
              Vue.prototype.CustomBar = e.statusBarHeight + 45;
            };
            // #endif

            // #ifdef MP-WEIXIN || MP-QQ
            Vue.prototype.StatusBar = e.statusBarHeight;
            // @ts-ignore
            let capsule = wx.getMenuButtonBoundingClientRect();
            if (capsule) {
              Vue.prototype.Custom = capsule;
              // Vue.prototype.capsuleSafe = uni.rpx2px(750) - capsule.left + uni.rpx2px(750) - capsule.right;
              Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
            } else {
              Vue.prototype.CustomBar = e.statusBarHeight + 50;
            }
            // #endif


            // #ifdef MP-ALIPAY
            Vue.prototype.StatusBar = e.statusBarHeight;
            Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
            // #endif
          }
        })

      },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style>
    @import "colorui/main.css";
    @import "colorui/icon.css";
    @import 'common/qiun.css';
	@import "common/uni.css";


    .nav-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0px 40rpx 0px;
      justify-content: space-between;
    }

    .nav-li {
      padding: 30rpx;
      border-radius: 12rpx;
      width: 45%;
      margin: 0 2.5% 40rpx;
      background-size: cover;
      background-position: center;
      position: relative;
      z-index: 1;
    }

    .nav-li::after {
      content: "";
      position: absolute;
      z-index: -1;
      background-color: inherit;
      width: 100%;
      height: 100%;
      left: 0;
      bottom: -10%;
      border-radius: 10rpx;
      opacity: 0.2;
      transform: scale(0.9, 0.9);
    }

    .nav-li.cur {
      color: #fff;
      background: rgb(94, 185, 94);
      box-shadow: 4rpx 4rpx 6rpx rgba(94, 185, 94, 0.4);
    }

    .nav-title {
      font-size: 32rpx;
      font-weight: 300;
    }

    .nav-title::first-letter {
      font-size: 40rpx;
      margin-right: 4rpx;
    }

    .nav-name {
      font-size: 28rpx;
      text-transform: Capitalize;
      margin-top: 20rpx;
      position: relative;
    }

    .nav-name::before {
      content: "";
      position: absolute;
      display: block;
      width: 40rpx;
      height: 6rpx;
      background: #fff;
      bottom: 0;
      right: 0;
      opacity: 0.5;
    }

    .nav-name::after {
      content: "";
      position: absolute;
      display: block;
      width: 100rpx;
      height: 1px;
      background: #fff;
      bottom: 0;
      right: 40rpx;
      opacity: 0.3;
    }

    .nav-name::first-letter {
      font-weight: bold;
      font-size: 36rpx;
      margin-right: 1px;
    }

    .nav-li text {
      position: absolute;
      right: 30rpx;
      top: 30rpx;
      font-size: 52rpx;
      width: 60rpx;
      height: 60rpx;
      text-align: center;
      line-height: 60rpx;
    }

    .text-light {
      font-weight: 300;
    }

    @keyframes show {
      0% {
        transform: translateY(-50px);
      }

      60% {
        transform: translateY(40rpx);
      }

      100% {
        transform: translateY(0px);
      }
    }

    @-webkit-keyframes show {
      0% {
        transform: translateY(-50px);
      }

      60% {
        transform: translateY(40rpx);
      }

      100% {
        transform: translateY(0px);
      }
    }
</style>

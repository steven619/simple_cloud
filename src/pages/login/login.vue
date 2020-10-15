<template>
    <view>
        <cu-custom bgColor="bg-gradual-pink" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">登陆</block>
        </cu-custom>
        <view class="cu-form-group" style="margin-top: 50px;margin-bottom: 50px;background-color: unset;">
            <image class="margin" style="height: 128px;width: 128px;margin: auto" src="../../static/logo.png"></image>
        </view>
        <form v-if="loginType === 'phone'">
            <view class="cu-form-group">
                <view class="title">手机号码</view>
                <input placeholder="输入手机号码" name="input" v-model="phoneNum"></input>
                <view class="cu-capsule radius">
                    <view class='cu-tag bg-blue '>
                        +86
                    </view>
                    <view class="cu-tag line-blue">
                        中国大陆
                    </view>
                </view>
            </view>
            <view class="cu-form-group">
                <view class="title">验证码</view>
                <input placeholder="输入验证码" name="input" v-model="password"></input>
                <button @tap="getSmsCode" :disabled="count !== 0"
                        open-type="getUserInfo"
                        @getuserinfo="getUserInfo"
                        class="cu-btn bg-green shadow"
                        style="width: 100px">{{smscodetext}}</button>
            </view>

            <view class="padding flex flex-direction">
                <button @tap="bindLogin" :disabled="!/\d{11}/.test(phoneNum) || !/\d{6}/.test(password)" class="cu-btn bg-green margin-tb-sm lg">登陆</button>
            </view>
        </form>
  
      <form v-if="loginType === 'username'">
        <view class="cu-form-group">
          <view class="title">用户名</view>
          <input placeholder="输入用户名" name="input" v-model="username"></input>
        </view>
        <view class="cu-form-group">
          <view class="title">密码</view>
          <input placeholder="输入密码" name="input" type="password" v-model="password"></input>
        </view>
    
        <view class="padding flex flex-direction">
          <button @tap="usernameLogin" class="cu-btn bg-green margin-tb-sm lg">登陆</button>
        </view>
      </form>
    </view>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
  import service from '../../service';
  import Cloud from '../../utils/cloud'
  @Component({
    name: 'Login',
    components: {
    }
  })
  export default class extends Vue {

    @Mutation('login') public login!: Function
    @State('forcedLogin') public forcedLogin!: string

      driver = new Cloud()
      providerList= []
      hasProvider= false
      phoneNum= '13999999999'
      username= ''
      password= ''
      smscodetext = '验证码'
      loginType = 'username'
      interval:any = undefined
      count:number = 0
      initProvider() {
      const filters = ['weixin', 'qq', 'sinaweibo'];

      uni.getProvider({
          service: 'oauth',
          success: (res:any) => {
              if (res.provider && res.provider.length) {
                  for (let i = 0; i < res.provider.length; i++) {
                      if (~filters.indexOf(res.provider[i])) {
                          this.providerList.push({
                            //@ts-ignore
                              value: res.provider[i],
                            //@ts-ignore
                              image: '../../static/img/' + res.provider[i] + '.png'
                          });
                      }
                  }
                  this.hasProvider = true;
              }
          },
          fail: (err) => {
              console.error('获取服务供应商失败：' + JSON.stringify(err));
          }
      });
      }
      bindLogin() {
          if (this.phoneNum.length < 5) {
              uni.showToast({
                  icon: 'none',
                  title: '账号最短为 5 个字符'
              });
              return;
          }
          if (this.password.length < 6) {
              uni.showToast({
                  icon: 'none',
                  title: '密码最短为 6 个字符'
              });
              return;
          }
          const data = {
              phone: this.phoneNum,
              smscode: this.password
              };

          this.driver.login(data).then((res:any) => {
            this.password = ''
                service.setToken(res.data.token)
                this.toMain(this.phoneNum);
          })
          }
      usernameLogin() {
      if (this.phoneNum.length < 5) {
        uni.showToast({
          icon: 'none',
          title: '账号最短为 5 个字符'
        });
        return;
      }
      if (this.password.length < 5) {
        uni.showToast({
          icon: 'none',
          title: '密码最短为 5 个字符'
        });
        return;
      }
      const data = {
        username: this.username,
        password: this.password
      };

      this.driver.loginUsername(data).then((res:any) => {
        this.password = ''
        service.setToken(res.data.token)
        this.toMain(this.phoneNum);
      })
    }
      oauth(value:any) {
        uni.login({
            provider: value,
            success: (res) => {
                uni.getUserInfo({
                    provider: value,
                    success: (infoRes:any) => {
                        /**
                         * 实际开发中，获取用户信息后，需要将信息上报至服务端。
                         * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
                         */
                        this.toMain(infoRes.userInfo.nickName);
                    }
                });
            },
            fail: (err) => {
                console.error('授权登录失败：' + JSON.stringify(err));
            }
        });
      }
      toMain(userName:string) {
        this.login(userName);
        uni.reLaunch({
          url: '../index/index',
        });
        // if (this.forcedLogin) {
        //     uni.reLaunch({
        //         url: '../main/main',
        //     });
        // } else {
        //     uni.navigateBack();
        // }
      }
	 

      getSmsCode(){
        uni.login({
          provider: 'weixin',
          success: function (loginRes) {
          }
        });
          if(this.count>0)return
          if(!/\d{11}/.test(this.phoneNum)){
              uni.showToast({
                  icon: 'none',
                  title: '请输入正确的手机格式'
              });
              return;
          }
          this.driver.smsCode({type: 'login',phone: this.phoneNum}).then((res:any)=>{
              uni.showToast({
                  icon: 'success',
                  title: '发送成功' 
              });
          })
          this.count = 60
          this.interval = setInterval(()=>{
              this.smscodetext = `${this.count}秒`
              this.count-=1
              if(this.count === 0){
                  this.smscodetext = `验证码`
                  clearInterval(this.interval)
              }
          }, 1000)
      }

      getUserInfo(e:any){
      }

      onLoad(){
      }
      onReady() {
          // this.initProvider();
      }
    }
</script>

<style scoped>

</style>

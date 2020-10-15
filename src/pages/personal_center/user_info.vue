<template>
  <view>
    <cu-custom bgColor="bg-gradual-green" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">个人信息</block>
    </cu-custom>
    <form>
      <upload-image :url="userInfo.avatar"
                    @chooseImage="(e)=>{userInfo.avatar = e.url}"
                    @delImage="userInfo.avatar=''" title="头像"></upload-image>
      
      <view class="cu-form-group margin-top">
        <view class="title">手机号</view>
        <input placeholder="手机号" class="text-right" name="input" v-model="userInfo.phone"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">姓名</view>
        <input placeholder="姓名" class="text-right" name="input" v-model="userInfo.name"></input>
      </view>
<!--      <view class="cu-form-group">-->
<!--        <view class="title">邀请码</view>-->
<!--        <input placeholder="身份证号" class="text-right" name="input" v-model="userInfo.invite_code"></input>-->
<!--      </view>-->

      <template v-if="Object.keys(userInfo).length > 0" v-for="(cert,index) in certList">
        <upload-image :url="userInfo[cert.value]"
                      :key="cert.value"
                      @chooseImage="chooseImageUserInfo($event, cert.value)"
                      @delImage="userInfo[cert.value]=''" :title="cert.title"></upload-image>
      </template>
      <view class="padding flex flex-direction">
        <button class="cu-btn bg-green margin-tb-sm lg" @click="saveUserInfo">保存</button>
      </view>
    </form>
    <confirm-message title="个人信息修改"
                     :show="modalName=='userinfo'"
                     @confirm="submitUserInfo"
                     @cancel="hideModal"
                     message="确定要修改信息吗?"></confirm-message>
  </view>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
  import General from '../../utils/general'
  import service from '@/service'
  import UploadImage from "@/components/card/upload-img.vue";
  

  @Component({
    name: 'UserInfo',
    components: {
      UploadImage
    }
  })
  export default class extends Vue {
    private general = new General()
    private userInfo:any = {}
    private modalName:string = ''
    private certList:any[] = []


    mounted() {
      this.getUserInfo()
    }
    hideModal() {
      this.modalName = ''
    }

    chooseImageUserInfo(e:any, key:string){
      this.userInfo[key] = e.url
    }

    getUserInfo(){
      this.general.getUserInfo().then((res:any)=>{
        this.userInfo = res.data
        console.log(this.userInfo)
      })
    }
    getImgUrl(key:string){
      return this.general.getImgUrl(this.userInfo[key])
    }

    DelImg(e:string) {
      uni.showModal({
        title: '提示',
        content: '确定要删除吗？',
        cancelText: '取消',
        confirmText: '确定',
        success: res => {
          if (res.confirm) {
            this.userInfo[e] = ''
          }
        }
      })
    }
    saveUserInfo() {
      let validatorUserInfo:any = {}
      if(!this.general.validatorForm(this.userInfo, validatorUserInfo))return
      console.log('校验通过')
      this.modalName = 'userinfo'
    }

    submitUserInfo(){
      this.hideModal()
      
      this.general.commonRequest('/test/test2','get',
          {phone:this.userInfo.name}).then((res:any)=>{

        service.setToken(res.token)
        uni.navigateBack({delta: 2})
      })
      
      // this.general.patchUserInfo(this.userInfo).then((res:any)=>{
      //   uni.showToast({
      //     icon: 'none',
      //     title: `修改成功`,
      //     duration: 2000
      //   });
      //   uni.navigateBack({delta: 2})
      // })
    }

    onLaunch() {
    }
    onShow() {
    }
    onHide() {
      console.log('App Hide')
    }
  }
</script>

<style scoped>

</style>

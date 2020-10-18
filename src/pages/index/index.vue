<template>
	<view>

    <bao-biao v-if="PageCur=='baobiao'"></bao-biao>
    <car-go v-if="PageCur=='cargo'"></car-go>
    <personal-center v-if="PageCur=='personal-center'"></personal-center>
    <view class="cu-bar tabbar bg-white shadow foot">
      <view class="action"
            v-for="item in menuList"
            :key="item.name"
            @click="NavChange" :data-cur="item.name">
        <view class='cuIcon-cu-image'>
          <image :src="`/static/tabbar/${item.name}` + [PageCur == item.name?'_cur':''] + '.png'"></image>
        </view>
        <view :class="PageCur==item.name?'text-green':'text-gray'">{{item.title}}</view>
      </view>
    </view>
	</view>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Cloud from '../../utils/cloud'
  import Workshop from "@/pages/workshop/workshop.vue";
  import Analysis from "@/pages/analysis/analysis.vue";
  import Alert from "@/pages/alert/alert.vue";
  import PersonalCenter from "@/pages/personal_center/personal_center.vue";

  import CarGo from "@/pages/workshop/cargo.vue";
  import BaoBiao from "@/pages/dashboard/baobiao.vue";

  @Component({
    name: 'MpIndex',
    components: {
      BaoBiao,
      CarGo,
      PersonalCenter,
      Alert,
      Analysis,
      Workshop,
    }
  })
  export default class extends Vue {
    private driver = new Cloud()
    private PageCur = ''
    private menuList = [
      { name: 'baobiao', title:'首页'},
      { name: 'cargo', title:'仓库'},
      { name: 'personal-center', title:'我的'}
    ]

    onLoad (option:any) {
      console.log('option', option);
      if(option.page){
        this.PageCur = option.page
        uni.showToast({
          icon: 'none',
          title: option.msg
        });
      }else {
        this.PageCur = 'baobiao'
      }
      this.$nextTick()
    }

    onPullDownRefresh() {
      uni.$emit('mainRefresh',{page:this.PageCur})
    }

    NavChange(e:any) {
      this.PageCur = e.currentTarget.dataset.cur
      console.log(this.PageCur)
    }
  }
</script>

<style>

</style>

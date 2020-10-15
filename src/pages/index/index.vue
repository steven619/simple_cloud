<template>
	<view>
    <dashboard v-if="PageCur=='dashboard'"></dashboard>
    <workshop v-if="PageCur=='workshop'"></workshop>
    <analysis v-if="PageCur=='analysis'"></analysis>
    <alert v-if="PageCur=='alert'"></alert>
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
  import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
  import Cloud from '../../utils/cloud'
  import Dashboard from '../dashboard/dashboard.vue'
  import Workshop from "@/pages/workshop/workshop.vue";
  import Analysis from "@/pages/analysis/analysis.vue";
  import Alert from "@/pages/alert/alert.vue";
  import PersonalCenter from "@/pages/personal_center/personal_center.vue";
  @Component({
    name: 'MpIndex',
    components: {
      PersonalCenter,
      Alert,
      Analysis,
      Workshop,
      Dashboard
    }
  })
  export default class extends Vue {
    private driver = new Cloud()
    private PageCur = ''
    private menuList = [
      { name: 'dashboard', title:'报表管理'},
      { name: 'workshop', title:'仓库管理'},
      // { name: 'analysis', title:'分析'},
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
        this.PageCur = 'dashboard'
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

<template>
  <view class="cu-list menu card-menu shadow-lg radius sm-border margin-top-xs">
        <view class="cu-form-group">
          <view class="text-orange title">报警号:{{alarm.alarm_no}}</view>
          <view class="text-blue title">报警类型:{{alarm.alarm_type}}</view>
        </view>
        <view class="cu-form-group">
          <view class="title">告警内容</view>
          <text>{{alarm.alarm_msg}}</text>
        </view>
      </view>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    @Component({
        name: 'AlarmCard',
        components: {
        }
    })
    export default class extends Vue {
        @Prop({required: true, default:null}) private alarm!: object
        @Prop({default: false}) private showdel!: boolean
      
      mounted(){
      }
      
    }
</script>

<style scoped>

</style>

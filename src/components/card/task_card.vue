<template>
    <view v-if="taskInfo">
      <view class="cu-list menu sm-border">
        <view class="cu-bar bg-white solid-bottom margin-top-xs">
            <view class="action">
                <text class="cuIcon-titles text-green"></text> {{taskInfo.name}}
            </view>
  
          <view class="action">
            <view class="cu-capsule round" @click="$emit('showTaskInfo', taskInfo)">
              <view class='cu-tag bg-green '>
                进度
              </view>
              <view class="cu-tag line-blue">
                {{taskInfo.amount_completed}}/{{taskInfo.task_number}}
              </view>
            </view>
          </view>
        </view>
  
        <view class="cu-item" style="margin-top: 1px;">
          <view class="content">
            <text class="cuIcon-stop text-brown"></text>
            <text class="text-grey">工件名称</text>
          </view>
          <view class="action">
            <text class="text-grey">{{taskInfo.workpiece.name}}</text>
          </view>
        </view>
        <view class="cu-item">
          <view class="content">
            <text class="cuIcon-all text-green"></text>
            <text class="text-grey">创建时间</text>
          </view>
          <view class="action">
            <text class="text-grey">{{taskInfo.create_time}}</text>
          </view>
        </view>
      </view>
    </view>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    @Component({
        name: 'TaskCard',
        components: {
        }
    })
    export default class extends Vue {
        @Prop({required: false, default:()=>{return {}}}) private taskInfo!: object
    }
</script>

<style scoped>

</style>

<template>
    <view v-if="treeNodeInfo">

      <view class="cu-list menu sm-border">
        <view @tap.stop="goPage(treeNodeInfo)" class="cu-bar bg-white solid-bottom margin-top-xs">
          <view class="action border-title">
            <text class="text-xl">
              [{{cloud.getBigDictName('machinetoolcategory', treeNodeInfo.machine_tool_category)}}]{{treeNodeInfo.no}}
            </text>
            <text class="bg-gradual-green" style="width:3rem"></text>
          </view>
          <view class="action">
              <view :class="['cu-tag', ['','line-green', 'line-red', 'line-blue'][treeNodeInfo.machine_tool_status]]">
                {{cloud.getBigDictName('machinetoolstatus', treeNodeInfo.machine_tool_status)}}
              </view>
          </view>
        </view>
        <view class="cu-item" @click="showTaskInfo(treeNodeInfo)">
          <view class="content">
            <text class="cuIcon-all text-green"></text>
            <text class="text-grey">当前任务</text>

          </view>
          <view class="action">
            <text class="text-grey">{{treeNodeInfo.current_task.name}}</text>
          </view>
        </view>
      </view>
      <view class="cu-list grid col-4" style="margin-top: 1px">
        <view class="cu-item" v-for="(item,index) in cuIconList" :key="index" @click="clickIcon(item.name, treeNodeInfo)">
          <view :class="['cuIcon-' + item.cuIcon,'text-' + ((item.name ==='告警' && treeNodeInfo.alarm.length===0)?'gray':item.color)]">
            <view class="cu-tag badge" v-if="item.name ==='告警' && treeNodeInfo.alarm.length>0">
              <block v-if="item.badge!=1">{{treeNodeInfo.alarm.length>99?'99+':treeNodeInfo.alarm.length}}</block>
            </view>
          </view>
          <text>{{item.name}}</text>
        </view>
      </view>
      <radio-modal :title="selectInfoTitle"
                   @touchmove.prevent
                   :show="showSelectModal"
                   show-type="common"
                   :radiolist="modalInfo"
                   @hideModal="showSelectModal = false">
        <view slot="common" class="cu-list menu text-left">
          <view class="cu-item" v-for="it in modalInfo" :key="it.id">
            <view class="content">
              <text class="cuIcon-info"></text>
              <text class="text-grey">{{it.title}}[{{(Math.round(it.count/treeNodeInfo.current_task.task_number*100)+'%')}}]</text>
            </view>
            <view class="action">
              <text class="text-grey">{{it.count}}/{{treeNodeInfo.current_task.task_number}}</text>
            </view>
          </view>
  
          <view class="cu-item">
            <view class="cu-progress radius striped active">
              <view :class="[`bg-${cloud.colorList[index].name}`]" v-for="(prog, index) in treeNodeInfo.current_task.task"
                    :style="[{ width:`${Math.round(prog.count/treeNodeInfo.current_task.task_number*100)}%`}]">
                {{`${Math.round(prog.count/treeNodeInfo.current_task.task_number*100) > 10 ?
                (Math.round(prog.count/treeNodeInfo.current_task.task_number*100)+'%'):''}`}}
              </view>
            </view>
            <text class="margin-left">{{`${Math.round(treeNodeInfo.current_task.amount_completed/treeNodeInfo.current_task.task_number*100)}%`}}</text>
          </view>
        </view>
      </radio-modal>
    </view>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import Cloud from "@/utils/cloud";
    import RadioModal from "@/components/common/radio_modal.vue";
    @Component({
        name: 'treeNodeCard',
        components: {
          RadioModal
        }
    })
    export default class extends Vue {
      @Prop({required: false, default:()=>{return {}}}) private treeNodeInfo!: any


      private cloud = new Cloud()
      private modalInfo:any = {}
      private showSelectModal:boolean = false
      private selectInfoTitle:string = ''

      showTaskInfo(e:any){
        this.selectInfoTitle = '工件生产明细'
        this.modalInfo = e.current_task.task.map((u:any)=>{
          return {title: u.operator.name,
          count: u.count}
        })
        this.showSelectModal = true
      }
      clickIcon(type:string, e:any){
        if(type === '告警'){
          if(e.alarm.length > 0){
            this.selectInfoTitle = `${e.no}告警信息`
            this.modalInfo = e.alarm.map((u:any)=>{
              return {title: u.code,
                count: u.message}
            })
            this.showSelectModal = true
          }else {
            uni.showToast({
              icon: 'none',
              title: `暂无告警`
            });
          }
        }else if(type === '刀具'){
          this.selectInfoTitle = `${e.no}刀具信息`
          this.modalInfo = e.cutter.map((u:any)=>{
            return {title: `[${u.cutter_category.name}]${u.name}`,
              count: u.message}
          })
          this.showSelectModal = true
        }else if(type === '设备状态'){
          uni.navigateTo({
            url: `/pages/workshop/device_detail?deviceId=${e.id}`
          });
        }else if(type === '历史任务'){
            uni.navigateTo({
              url: `/pages/workshop/task_list?treeNodeId=${e.id}`
            })
        }
      }

      get cuIconList(){
      return [
          {
            cuIcon: 'settings',
            color: 'green',
            badge: 6,
              name: '历史任务'
            }, {
              cuIcon: 'list',
              color: 'blue',
              badge: 7,
              name: '设备状态'
            }, {
              cuIcon: 'lightauto',
              color: 'yellow',
              badge: 8,
              name: '刀具'
            }, {
              cuIcon: 'noticefill',
              color: 'red',
              badge: 9,
              name: '告警'
            }]
      }

      private goPage(treeNodeInfo:any){
        // if(treeNodeInfo.children_count>0){
        //   uni.navigateTo({
        //     url: `/pages/workshop/workshop?treeNodeId=${treeNodeInfo.id}`
        //   })
        // }else {
        //   uni.showToast({
        //     icon: 'none',
        //     title: '项目内暂无子部门'
        //   })
        // }
      }
    }
</script>

<style scoped>

</style>

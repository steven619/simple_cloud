<template>
    <view>
        <cu-custom bgColor="bg-gradual-green" :isFixed="false" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">机床</block>
        </cu-custom>
        <scroll-view scroll-y class="page">
  
          <scroll-view scroll-x class="bg-white nav">
            <view class="flex text-center">
              <view class="cu-item flex-sub" :class="item.value==tabCur?'text-orange cur':''"
                    v-for="(item,index) in deviceStateList" :key="item.name" @tap="tabSelect" :data-id="item.value">
                  {{item.name}}
                  <view v-if="item.value===2 && alarmList.length>0" class="cu-tag badge" style="position: relative">{{alarmList.length}}</view>
              </view>
            </view>
          </scroll-view>
  
  
          <view v-if="tabCur === '0'" class="cu-list menu sm-border">
            <view class="cu-item" v-for="(info,index) in infoList" :key="info.name_zh">
              <view class="content">
                <text :class="[`cuIcon-${info.icon}`,`text-${info.color}`]"></text>
                <text class="text-grey">{{info.name_zh}}</text>
              </view>
              <view class="action">
                <text class="text-grey">{{showValue(info)}}</text>
              </view>
            </view>
          </view>

          <view v-show="tabCur === '1'">
            <view class="cu-list grid col-3" style="margin-top: 1px">
              <template v-for="(item,index) in variableList" >
                <view class="cu-item" :key="item.id">
                  <view class="text-green text-xl show-variable">
                    {{showValue(item)}} <span class="text-xs">{{item.unit}}</span>
                  </view>
                  <text>{{item.name_zh}}</text>
                </view>
              </template>
            </view>
            
            <gcode-card :gcode-data="gcodeList"></gcode-card>
            
            <pos-card :pos-data="posList"></pos-card>
  
            <template v-for="(axis, index) in axisList">
              <curve :key="axis.id" :curve-data="axis"></curve>
            </template>
            
            <template v-for="(rate, index) in rateList">
              <gauge :key="rate.id" :gauge-data="rate" :max="1000"></gauge>
            </template>
  
            <currentpro-card :currentpro-data="currentproList"></currentpro-card>

          </view>
          
          <view v-if="tabCur === '2'">
            <template v-for="(alarm, index) in alarmList">
              <alarm-card :key="alarm.id" :alarm="alarm"></alarm-card>
            </template>
            <view v-if="alarmList.length === 0" class="margin text-gray" style="text-align: center">暂无告警</view>
          </view>
          
        </scroll-view>

        <view class="cu-load load-modal" v-if="loadModal">
            <view class="cuIcon-emojifill text-orange"></view>
            <view class="gray-text">加载中...</view>
        </view>
    </view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import DeviceCard from '../../components/card/device_card.vue'
    import AlarmCard from "@/components/card/alarm_card.vue";
    import Curve from "../../components/charts/curve.vue";
    import PosCard from "@/components/card/pos_card.vue";
    import GcodeCard from "@/components/card/gcode_card.vue";
    import CurrentproCard from "@/components/card/currentpro_card.vue";
    import CloudApi from '../../utils/cloud'
    import {baseDict, baseWsUrl} from "@/utils/config";
    import Gauge from "@/components/charts/gauge.vue";
    import service from "@/service";
    @Component({
        name: 'DeviceDetail',
        components: {
          Gauge,
          CurrentproCard,
          GcodeCard,
          PosCard,
          Curve,
          AlarmCard,
          DeviceCard
        }
    })
    export default class extends Vue {
      private cloud = new CloudApi()
      private projectId = 0
      private deviceStateList = [
        {name: '基本信息', value: 0},
        {name: '实时状态', value: 1},
        {name: '告警', value: 2}
      ]
      
      private query:any = {
        keywords: '',
        start: 0,
        limit: 100,
        state: 0,
        project_id: 3
      }
      private loadModal:boolean = false
      private variableList:any[] = []
      private axisList:any[] = []
      private posList:any = {}
      private gcodeList:any = {
        cnc_gcode: null,
        cnc_setfspeed: null,
        cnc_setspeed: null
      }
      private currentproList:any = {}
      private infoList:any[] = []
      private infoListBase:any[] = []
      private rateList:any[] = []
      private rateToShow:string[] = ['cnc_actspeed', 'cnc_actfspeed']
      private alarmList:any[] = []
      private interval:any = null
      private intervalWs:any = null
      private tabCur:string = '0'
      private ws:any = null
      private logDictTemp:any = {}
      private logDict:any[] = []
      private isWsData:boolean = false
      private baseInfo = [
        {name:"cnc_products", icon:"list", color: "red"},
        {name:"cnc_type", icon:"list", color: "red"},
        {name:"cnc_ip", icon:"repair", color: "blue"},
        {name:"cnc_id", icon:"activity", color: "green"},
        {name:"cnc_mainproname", icon:"info", color: "gray"},
        ]

      onLoad (option:any) {
        if(option.deviceId){
          this.projectId = option.deviceId
          this.query.project_id = this.projectId
        }
        this.getVariable()
      }
      
      mounted(){
        this.interval = setInterval(async ()=>{
          if (!this.isWsData) {
            await this.getVariable()
          }
          this.isWsData = false
        },3000)
        // todo 完成实时查询
        setTimeout(()=>{
          this.startIntervalWs()
        },3000)
        this.startWatchSocketMessage(this.query.project_id)
      }

      onUnload(){
        uni.onSocketOpen(function () {
          uni.closeSocket({});
        });
        clearInterval(this.interval)
        console.log('关闭socket')
      }

      showValue(val:any){
        let k = baseDict
        // @ts-ignore
        if(val.device && Object.keys(k).indexOf(val.device.type) > -1 && Object.keys(k[val.device.type]).indexOf(val.name)> -1){
          // @ts-ignore
          let p = k[val.device.type][val.name].filter(e=>{return  e.value === val.last_value.value})
          return p.length > 0?p[0].name:val.last_value.value
        }else if(val.last_value && val.last_value.value !== undefined && val.last_value.value!== null){
          if(val.name && val.name.indexOf('time')>-1){
            return  this.cloud.secondsTohm(val.last_value.value)
          }else if(val.last_value && typeof val.last_value.value === "number"){
            return Math.round(val.last_value.value*100)/100
          }else{
            return val.last_value.value
          }
        }
        return '--'
      }

      tabSelect(e:any) {
        this.tabCur = e.currentTarget.dataset.id + ''
        this.query.state = e.currentTarget.dataset.id + ''
      }

      public pullDownRefresh() {
        this.query.keywords = ''
        this.getVariable()
      }

      private startWatchSocketMessage(projectId:string) {
        let token = service.getToken()
        const url = `${baseWsUrl}/api/socket/app?project=${projectId}&token=${token}`
        uni.connectSocket({
          url: url
        });
        uni.onSocketOpen(function (res) {
          console.log('WebSocket连接已打开！', JSON.stringify(res));
        });
        uni.onSocketError(function (res) {
          console.log('WebSocket连接打开失败，请检查！', JSON.stringify(res));
        });
        uni.onSocketMessage((evt:any)=> {
            this.isWsData = true
            try {
              let d = JSON.parse(evt.data)
              this.logDictTemp[d.n] = d
            } catch (e) {
              console.log('error')
            }
        });
      }
      
      private startIntervalWs(){
        this.intervalWs = setInterval(() => {
          // console.log('run intervalWs')
          if (this.isWsData) {
            // this.logDict = JSON.parse(JSON.stringify(this.logDictTemp))
            this.parseData(this.logDict, true)
          }
        }, 100)
      }
      
      
      private parseData(resData:any, ws:boolean=false) {

        let variableList:any[] = []
        let alarmList:any[] = []
        let axisList:any[] = []
        let rateList:any[] = []
        let infoList:any[] = []
        let posList:any = {
          cnc_mecpos: {name: "cnc_mecpos", name_zh: "机械坐标"},
          cnc_relpos: {name: "cnc_relpos", name_zh: "相对坐标"},
          cnc_ablpos: {name: "cnc_ablpos", name_zh: "绝对坐标"},
          cnc_respos: {name: "cnc_respos", name_zh: "剩余坐标"}
        }
        let gcodeList:any = {
          cnc_gcode: null,
          cnc_setfspeed: null,
          cnc_setspeed: null
        }

        resData.forEach((k:any)=>{
          if(ws && this.logDictTemp[k.name]){
            k.last_value.value = this.logDictTemp[k.name].v
            k.last_value.ts = this.logDictTemp[k.name].t
          }
          let i:number = this.baseInfo.map(e=>{return e.name}).indexOf(k.name)
          if(i>-1){
            k.color = this.baseInfo[i].color
            k.icon = this.baseInfo[i].icon
            infoList.push(k)
          }else if(k.name === 'cnc_alarm'){
            alarmList = k.last_value.value
          }else if(k.name === 'cnc_currentpro'){
            this.currentproList = k
          }else if(this.rateToShow.indexOf(k.name) > -1){
            rateList.push(k)
          }else if(k.name === 'cnc_gcode'){
            gcodeList.cnc_gcode = k
          }else if(k.name === 'cnc_setfspeed'){
            gcodeList.cnc_setfspeed = k
          }else if(k.name === 'cnc_setspeed'){
            gcodeList.cnc_setspeed = k
          }else if(k.name.endsWith('pos')){
            posList[k.name] = k
          }else if(typeof k.last_value.value === 'object'){
            k.cid = k.name
            axisList.push(k)
          }else {
            variableList.push(k)
          }
        })

        this.variableList = variableList
        this.alarmList = alarmList
        this.axisList = axisList
        this.rateList = rateList
        this.posList = JSON.parse(JSON.stringify(posList))
        this.gcodeList = gcodeList
        this.infoList = [...this.infoListBase, ...infoList]

        this.loadModal = false
      }
      
      private getVariable(){
        // this.loadModal = true
        this.cloud.getVariable(this.query).then((res:any)=>{
          this.infoListBase = [
              {name_zh: '车间', last_value: {value:res.extra_data.department.name}, color: 'blue', icon: 'shop'},
              {name_zh: '状态', last_value: {value:res.extra_data.status}, color: 'green', icon: 'creative'},
              {name_zh: '今日产量', last_value: {value:res.extra_data.today_products}, color: 'orange', icon: 'stop'},
              {name_zh: '本周产量', last_value: {value:res.extra_data.week_products}, color: 'brown', icon: 'all'},
          ]
          this.logDict = res.data
          this.parseData(this.logDict)
        }).finally(()=>{
          this.loadModal = false
        })
      }

    }
</script>
<style scoped>
  .show-variable{
    line-height: 30px;
    height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
</style>


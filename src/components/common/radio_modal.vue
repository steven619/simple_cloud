<template>
  <view class="cu-modal" :class="visiable?'show':''" @tap="hideModal">
    <view class="cu-dialog" :class="{'margin-top':search}">
      <view class="cu-bar bg-white justify-end">
        <view class="content">{{title}}</view>
        <view class="action" @tap="hideModal">
          <text class="cuIcon-close text-red"></text>
        </view>
      </view>
      <view class="cu-bar search" v-if="search">
        <view class="search-form radius">
          <text class="cuIcon-search"></text>
          <input :adjust-position="false"
                 type="text" placeholder="搜索关键字" v-model="keywords" confirm-type="search"></input>
        </view>
        <view class="action" @tap="keywords=''" v-if="keywords">
          <text class="cuIcon-close"></text>
          <text>取消</text>
        </view>
      </view>
      <scroll-view scroll-y class="scrollPage">
        <radio-group class="block" @change="RadioChange">
        <view class="cu-list menu text-left">
          <view class="cu-item" v-if="showType === 'radio'" v-for="(item,index) in list" :key="index">
            <label class="flex justify-between align-center flex-sub">
              <view class="flex-sub">{{item.title}}</view>
              <radio class="round" :class="radio==item.value?'checked':''" :checked="radio==item.value?true:false"
                     :value="item.value"></radio>
            </label>
          </view>
          <slot v-if="showType === 'common'" name="common">
          </slot>
        </view>
      </radio-group>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    @Component({
        name: 'RadioModal',
        components: {
        }
    })
    export default class extends Vue {
      @Prop({required: false, default:'请选择'}) private title!: string
      @Prop({required: false}) private radiolist!: any[]
      @Prop({required: false, default:'取消'}) private cancelText!: string
      @Prop({required: false, default:'确定'}) private confirmText!: string
      @Prop({required: false, default:'radio'}) private showType!: string
      @Prop({required: false, default:false}) private show?: boolean
      @Prop({required: false, default:false}) private search?: boolean
      @Prop({required: false, default:true}) private showButton?: boolean

      private visiable:boolean = false
      // private list:any = []
      private radio:any = {}
      private keywords:string = ''

        @Watch('show', { immediate: true })
        changeShow(val:boolean,oldVal:boolean){
            if(val !== oldVal){
                this.visiable = val
            }
        }
      // @Watch('keywords', { immediate: true })
      //   changeKeywords(val:boolean,oldVal:boolean){
      //     if(val !== oldVal){
      //       console.log(val)
      //     }
      //   }
      
      get list(){
        if(this.radiolist && this.radiolist.length > 0){
          let a = this.radiolist && this.radiolist.filter((e:any)=>{
            return e.title.indexOf(this.keywords)> -1
          })
          let b = this.radiolist && this.radiolist.filter((e:any)=>{
            return e.title.indexOf(this.keywords)=== -1
          })
          return [...a, ...b]
        }else {
          return  []
        }
      }

        private RadioChange(e:any){
        if (this.showType === 'common')return
          let v = e.target.value
          if(/\d+/.test(v)){
            v=parseInt(v)
          }
          this.visiable = false
          this.$emit('radioChange', {value: v})
          this.$emit('hideModal')
        }

        private hideModal(){
            this.visiable = false
            this.$emit('hideModal')
        }
    }
</script>

<style scoped>
.scrollPage{
  max-height: 380px;
}
</style>

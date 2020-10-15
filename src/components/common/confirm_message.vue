<template>
    <view class="cu-modal" :class="visiable?'show':''">
        <view class="cu-dialog">
            <view class="cu-bar bg-white justify-end">
                <view class="content">{{title}}</view>
                <view class="action" @tap="hideModal">
                    <text class="cuIcon-close text-red"></text>
                </view>
            </view>
            <view class="padding-xl">
                <text v-if="message">{{message}}</text>
                <slot name="content"></slot>
            </view>
            <view class="cu-bar bg-white justify-end" v-if="showButton">
                <view class="action">
                    <button class="cu-btn line-green text-green" @tap="hideModal">{{cancelText}}</button>
                    <button class="cu-btn bg-green margin-left" @tap="submit">{{confirmText}}</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
    @Component({
        name: 'ConfimMessage',
        components: {
        }
    })
    export default class extends Vue {
        @Prop({required: true, default:'确定要删除吗?'}) private message!: string|boolean
        @Prop({required: false, default:'提示'}) private title!: string
        @Prop({required: false, default:'取消'}) private cancelText!: string
        @Prop({required: false, default:'确定'}) private confirmText!: string
        @Prop({required: true, default:false}) private show?: boolean
        @Prop({required: false, default:true}) private showButton?: boolean

        private visiable:boolean = false

        @Watch('show', { immediate: true })
        changeShow(val:boolean,oldVal:boolean){
            if(val !== oldVal){
                this.visiable = val
            }
        }

        private submit(){
            this.visiable = false
            this.$emit('confirm')
        }

        private hideModal(){
            this.visiable = false
            this.$emit('cancel')
        }
    }
</script>

<style scoped>

</style>

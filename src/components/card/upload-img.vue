<template>
  <view class="cu-form-group margin-top-1">
    <view class="title">{{title}}</view>

    <view v-if="justShow" class="grid col-4 grid-square flex-sub sm" style="margin-top: 10px;justify-content: flex-end;">
      <view class="bg-img" @tap="general.viewImage(url)"
            v-if="url"
            :data-url="getImgUrl(url)">
        <image :src="getImgUrl(url)" mode="aspectFill"></image>
      </view>
      <view v-if="!url" class="solids">
        <text class='cuIcon-album'></text>
      </view>
    </view>
    <view v-else class="grid col-4 grid-square flex-sub sm" style="margin-top: 10px;justify-content: flex-end;">
      <view class="bg-img" style="width: 68px;height: 68px;" @tap="ViewImage(url)"
            v-if="url"
            :data-url="getImgUrl(url)">
        <image :src="getImgUrl(url)" mode="aspectFill"></image>
        <view class="cu-tag bg-red" @tap.native.stop="delImg" :data-index="0">
          <text class='cuIcon-close'></text>
        </view>
      </view>
      <view v-if="!url" class="solids" style="width: 68px;height: 68px;" @tap="chooseImage">
        <text class='cuIcon-cameraadd'></text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import General from '../../utils/general'
    @Component({
        name: 'UploadImage',
        components: {
        }
    })
    export default class extends Vue {
      @Prop({required: true, default:null}) private url!: object
      @Prop({default: '上传头像'}) private title!: boolean
      @Prop({default: false}) private justShow!: boolean
      private general = new General()


      getImgUrl(key:string){
        return this.general.getImgUrl(key)
      }

      chooseImage(e:string) {
        uni.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: (res:any) => {
            this.general.uploadFile(res.tempFilePaths[0]).then((res:any)=>{
              let d = JSON.parse(res)
              this.$emit('chooseImage', {url: d.data.url})
            })
          }
        });
      }

      ViewImage(e:string) {
        let url = this.general.getImgUrl(e)
        uni.previewImage({
          urls: [url],
          current: url
        });
      }

      delImg(e:string) {
        uni.showModal({
          title: '提示',
          content: '确定要删除吗？',
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              this.$emit('delImage')
            }
          }
        })
      }
    }
</script>

<style scoped>

</style>

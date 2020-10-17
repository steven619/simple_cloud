<template>
    <view>
        <cu-custom bgColor="bg-gradual-green" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">仓库管理</block>
        </cu-custom>
      <view class="solids-bottom padding-xs flex align-center">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xsl padding">
            <text class=" cuIcon-roundcheckfill text-green"></text>
          </view>
          <view class="padding text-black text-bold">更多功能正在开发中！</view>
        </view>
      </view>
    </view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component({
        name: 'GengDuo',
        components: {
        }
    })
    export default class extends Vue {

    }
</script>
<style scoped>

</style>


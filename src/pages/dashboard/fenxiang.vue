<template>
<view>
  <cu-custom bgColor="bg-gradual-green" :isBack="true">
    <block slot="backText">返回</block>
    <block slot="content">邀请有礼</block>
  </cu-custom>
  <image src="/static/images/fenxiang.jpg" mode="widthFix" class="response"></image>
</view>
</template>

<script>
export default {
  name: "FenXiang"
}
</script>

<style scoped>

</style>

<template>
  <view>
    <cu-custom bgColor="bg-gradual-blue" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">分析</block>
    </cu-custom>
  </view>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
  import Cloud from '../../utils/cloud'
  @Component({
    name: 'Analysis',
    components: {
    }
  })
  export default class extends Vue {
    private cloud = new Cloud()
  }
</script>

<style scoped>

</style>

<!--页面容器-->
<template>
  <div class="um-page" :id="id">
    <div class="um-header" v-show="showHeader" >
      <slot name="header"></slot>
    </div>
    <div class="um-content">
      <slot></slot>
    </div>
    <slot name="addtion"></slot>
    <div class="um-footer" v-show="showFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      id: {
        type: String
      },
      showHeader: {
        type: Boolean,
        default: false
      },
      showFooter: {
        type: Boolean,
        default: false
      },
      isActive: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="less">
  @import '../../css/base.less';
  .um-page {
    background: @color-bg;
  }
</style>

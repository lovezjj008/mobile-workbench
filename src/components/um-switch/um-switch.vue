<template>
  <label class="um-switch1">
    <input type="checkbox" :value="ischecked?'on':'off'" :checked="ischecked" @change="change">
    <div class="um-track">
      <div class="um-handle">
      </div>
    </div>
  </label>
</template>
<script>
  export default {
    props: {
      ischecked: {
        default: false
      },
      id: {
        default: ''
      }
    },
    methods: {
      change: function () {
//        this.ischecked = !this.ischecked
        this.$nextTick(() => {
//          监听调用组件时传入的change事件
          this.$emit('change', this.id, !this.ischecked)
        })
      }
    }
  }
</script>
<style lang="less">
  @import '../../css/base.less';
  .um-switch1 input[type="checkbox"]:checked ~ .um-track {
    border-color: @color-base;
    background-color: @color-base;
  }
</style>

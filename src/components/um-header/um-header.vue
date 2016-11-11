<template>
  <div class="um-header-fixed">
    <a class="fl um-scan">
      <img src="../../assets/img/scan.png" alt="" />
      <div class="f12">扫一扫</div>
    </a>
    <div class="um-input-group">
      <span class="t-search"></span>
      <input type="search" class="form-control" :placeholder="placeholder">
      <span class="t-camera"></span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      placeholder: {
        type: String
      }
    }
  }
</script>
<style>

</style>

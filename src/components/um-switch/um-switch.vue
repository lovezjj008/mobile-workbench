<template>
  <label class="um-switch1">
    <input type="checkbox" :value="ischecked?'on':'off'" :checked="ischecked">
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
      }
    }
  }
</script>

<template>
  <div class="um-header-fixed" :style="background-color:bgc">
    <p>{{title}}</p>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      bgc: {
        type: String,
        default: '#FFF'
      }
    }
  }
</script>
<style>

</style>

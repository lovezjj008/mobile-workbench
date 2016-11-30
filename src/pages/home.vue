<template>
  <div id="article">
    <div id="home" class="active">
      <um-header></um-header>
      <um-swiper></um-swiper>
      <um-todo></um-todo>
      <um-appmanager></um-appmanager>
    </div>
  </div>
</template>
<script>
  import {umHeader, umTodo, umAppmanager, umSwiper} from 'components/umindex'

  export default {
    components: {
      umHeader,
      umTodo,
      umAppmanager,
      umSwiper
    }
  }
</script>

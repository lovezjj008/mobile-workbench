<template>
  <div id="article">
    <div id="home" class="active">
      <um-header></um-header>
      <um-swiper></um-swiper>
      <todo></todo>
      <um-appmanager></um-appmanager>
    </div>
  </div>
</template>
<script>
  import {umHeader, umAppmanager, umSwiper} from 'components/umindex'
  import {todo} from 'model/modelindex'

  export default {
    components: {
      umHeader,
      todo,
      umAppmanager,
      umSwiper
    }
  }
</script>

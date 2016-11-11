<template>
  <div id="article">
    <div id="home" class="active">
      <um-header></um-header>
      <div class="um-row">
        <div id="iSlider-wrapper" class="iSlider-wrapper"></div>
      </div>
      <um-layout-text></um-layout-text>
      <um-appmanager></um-appmanager>
    </div>
  </div>
</template>
<script>
  import {umHeader, umLayoutText, umAppmanager} from 'components/umindex'

  export default {
    components: {
      umHeader,
      umLayoutText,
      umAppmanager
    }
  }
</script>

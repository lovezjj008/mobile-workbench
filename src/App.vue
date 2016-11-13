<template>
<div>
  <um-page class="active" id="main">
    <div slot="footer">footer</div>
    <router-view></router-view>
    <um-footer-custom slot="addtion"></um-footer-custom>
  </um-page>
  <um-page :showHeader="true" id="application">
    <div class="um-header" slot="header">
      <a onclick="back()" class="um-back">返回</a>
      <h3>添加应用</h3>
    </div>
    <application-list></application-list>
  </um-page>
</div>
</template>

<script>
import {umPage, umFooterCustom} from 'components/umindex'
import applicationList from 'pages/applicationlist.vue'

export default {
  name: 'app',
  components: {
    umPage,
    umFooterCustom,
    applicationList
  },
  mounted () {
    window.UM.initPage()
  }
}
</script>

<style>

</style>

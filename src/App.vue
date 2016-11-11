<template>
  <div>
    <um-page class="active" id="main">
      <div slot="footer">footer</div>
      <router-view></router-view>
      <div slot="addtion">
        <um-footer-custom></um-footer-custom>
      </div>
    </um-page>
    <um-page :showHeader="true" id="application">
      <div slot="header">
        <div class="um-header">
          <a onclick="back()" class="um-back">返回</a>
          <h3>添加应用</h3>
        </div>
      </div>
    </um-page>
  </div>
</template>

<script>
import {umPage, umFooterCustom} from 'components/umindex'

export default {
  name: 'app',
  components: {
    umPage,
    umFooterCustom
  },
  mounted () {
    window.UM.page = new window.Page()
  }
}
</script>

<style>
@import "assets/css/font-icons.css";
@import "assets/css/iuapmobile.um.css";
@import "assets/css/islider.css";
@import "assets/css/main.css";
@import "assets/css/index.css";
</style>

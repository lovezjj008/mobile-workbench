<template>
<div>
  <um-page class="active" id="main">
    <router-view></router-view>
    <um-footer-custom slot="addtion"></um-footer-custom>
  </um-page>
  <um-page :showHeader="true" id="application">
    <div class="um-header" slot="header">
      <a onclick="back()" class="um-back"></a>
      <h3>添加应用</h3>
    </div>
    <application-list></application-list>
  </um-page>
  <um-page :showHeader="true" id="todo">
    <todo-mgr-header slot="header"></todo-mgr-header>
    <todo-mgr></todo-mgr>
  </um-page>
  <um-page :showHeader="true" id="iframe">
    <div class="um-header" slot="header">
      <a onclick="back()" class="um-back"></a>
      <h3>{{title}}</h3>
    </div>
    <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
  </um-page>
</div>
</template>

<script>
import {umPage, umFooterCustom} from 'components/umindex'
import applicationList from 'pages/applicationlist.vue'
import {todoMgr, todoMgrHeader} from 'model/modelindex'

export default {
  name: 'app',
  components: {
    umPage,
    umFooterCustom,
    applicationList,
    todoMgr,
    todoMgrHeader
  },
  mounted () {
    window.UM.initPage()
    window.addEventListener('iframeChange', function (event) {
      this.title = window.iframetitle
      this.url = window.iframeurl
    }.bind(this), false)
  },
  data () {
    return {
      title: '',
      url: ''
    }
  }
}
</script>

<style lang="less">
  @import "css/base.less";
  @import 'css/common.less';
  @import 'css/iuapfix.less';
</style>

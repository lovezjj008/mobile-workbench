<template>
  <div class="um-footer">
    <div class="um-footerbar">
      <router-link :to="item.target" class="um-footerbar-item" :class="{active:item.active}" :data-tar="item.target"  v-for="item in menulist">
        <div class="mb5" v-bind:class="item.iconfont"></div>
        <div class="f14 lh1">{{item.title}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    mounted () {
      this.menulist[0].active = true
    },
    data () {
      return {
        menulist: [{
          title: '首页',
          target: 'home',
          iconfont: 'icon-home',
          active: false
        }, {
          title: '消息',
          target: 'msg',
          iconfont: 'icon-msg',
          active: false
        }, {
          title: '商品',
          target: '#goods',
          iconfont: 'icon-goods',
          active: false
        }, {
          title: '我的',
          target: '#mine',
          iconfont: 'icon-mine',
          active: false
        }
        ]
      }
    }
  }
</script>
<style lang="less">
  @import "../../css/base.less";
  .um-footerbar-item.active {
    color: @color-base;
  }
</style>

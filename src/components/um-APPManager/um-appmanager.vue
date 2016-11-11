<template>
  <div id='uappmanager'>

  </div>
</template>
<script>
  import AppManager from './AppManager'
  export default {
    mounted () {
      let _app = new AppManager('#uappmanager', this.applist)
      console.log(_app)
    },
    data () {
      return {
        applist: {
          el: '#uappmanager',
          data: [{
            'label': '询报价',
            'img': 'static/img/xbj.png',
            'url': 'http: //uapma.yonyou.com: 8443/weixin/summerShow_web/index.html'
          }, {
            'label': '招投标',
            'img': 'static/img/ztb.png',
            'url': 'http: //uapma.yonyou.com: 8443/weixin/summerShow_web/index.html'
          },
          {
            'label': '超市',
            'img': 'static/img/cs.png',
            'url': 'http: //uapma.yonyou.com: 8443/weixin/summerShow_web/index.html'
          },
          {
            'label': '在线竞价',
            'img': 'static/img/jj.png',
            'url': 'http: //uapma.yonyou.com: 8443/weixin/summerShow_web/index.html'
          },
          {
            'label': '供应商准入',
            'img': 'static/img/zr.png',
            'url': 'http: //uapma.yonyou.com: 8443/weixin/summerShow_web/index.html'
          },
          {
            'label': '收获',
            'img': 'static/img/sh.png',
            'url': 'http: //uapma.yonyou.com: 8443/weixin/summerShow_web/index.html'
          },
          {
            'label': '对账',
            'img': 'static/img/dz.png',
            'url': 'http: //uapma.yonyou.com: 8443/weixin/summerShow_web/index.html'
          }],
          colum: 4
        }
      }
    }
  }
</script>
<style scoped>
  #uappmanager {
    margin-top: 10px;
    background: #ffffff;
  }
</style>

import baseservice from '../baserservice'

function getList (success) {
  // baseservice.get('url', {}, success)
  let data = [
    {
      'label': '询报价',
      'img': 'static/img/xbj.png',
      'url': 'http: //uapma.yonyou.com: 8443/weixin/summerShow_web/index.html'
    },
    {
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
    }
  ]
  success(data)
}

function getItem (success) {
  baseservice.get('url/1', {}, success)
}
export default {
  getList,
  getItem
}

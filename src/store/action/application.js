import baseservice from '../baserservice'

function getList (success) {
  // baseservice.get('url', {}, success)
  let data = [
    {
      'label': '报价管理',
      'img': 'static/img/xbj.png',
      'url': '/mobile/supply/dist/index.html#!/qutation'
    },
    {
      'label': '销售管理',
      'img': 'static/img/ztb.png',
      'url': '/mobile/supply/dist/index.html#!/saleorderlist'
    },
    {
      'label': '发票查询',
      'img': 'static/img/cs.png',
      'url': '/mobile/supply/dist/index.html#!/invoicelist'
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

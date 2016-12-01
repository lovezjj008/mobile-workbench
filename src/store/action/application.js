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

import service from '../baserservice'
import {QUTATION, DELIVERY, INVOICE, SALE_ORDER, CHECK, BID} from '../../const'

let data = [
  {id: 1, key: QUTATION, title: '未报价', modal: '报价管理', belong: '供应商', text: '0', 'url': '/mobile/supply/dist/index.html#!/qutation', 'isShow': true, display: true},
  {id: 2, key: DELIVERY, title: '待发货', modal: '发货管理', belong: '供应商', text: '0', 'url': 'http://www.baidu.com', 'isShow': true, display: true},
  {id: 3, key: INVOICE, title: '待开票', modal: '发票管理', belong: '供应商', text: '0', 'url': 'http://www.baidu.com', 'isShow': true, display: true},
  {id: 4, key: CHECK, title: '待对账', modal: '对账管理', belong: '供应商', text: '0', 'url': 'http://www.baidu.com', 'isShow': true, display: true},
  {id: 5, key: BID, title: '招标中', modal: '投标管理', belong: '供应商', text: '0', 'url': 'http://www.baidu.com', 'isShow': true, display: true},
  {id: 6, key: SALE_ORDER, title: '待确认', modal: '销售订单管理', belong: '供应商', text: '0', 'url': '/mobile/supply/dist/index.html#!/saleorderlist', 'isShow': true, display: true}
]
// 获取本人已选择的待办列表
function getList (success) {
  // baseservice.get('url', {}, success)

  success(data)
}
// 获取所有可选择的待办列表
function getALLList (success) {
  success(data)
  // service.get('/1', success)
}

function saveLocal (success) {
  service.post('/2', success)
}

export default {
  getList,
  getALLList,
  saveLocal
}

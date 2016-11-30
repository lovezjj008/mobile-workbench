import service from '../baserservice'
// 获取本人已选择的待办列表
function getList (success) {
  // baseservice.get('url', {}, success)
  let data = [
    {title: '待定标', text: '12', 'url': 'http://www.baidu.com'},
    {title: '待收货', text: '3', 'url': 'http://www.baidu.com'},
    {title: '待确认对', text: '3', 'url': 'http://www.baidu.com'},
    {title: '待发布', text: '5', 'url': 'http://www.baidu.com'},
    {title: '待审批', text: '1', 'url': 'http://www.baidu.com'}
  ]
  success(data)
}
// 获取所有可选择的待办列表
function getALLList (success) {
  let data = [
    {title: '待定标', text: '12', 'url': 'http://www.baidu.com'},
    {title: '待收货', text: '3', 'url': 'http://www.baidu.com'},
    {title: '待确认对', text: '3', 'url': 'http://www.baidu.com'},
    {title: '待发布', text: '5', 'url': 'http://www.baidu.com'},
    {title: '待审批', text: '1', 'url': 'http://www.baidu.com'}
  ]
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

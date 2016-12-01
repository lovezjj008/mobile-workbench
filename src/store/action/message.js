import baseservice from '../baserservice'

// 获取所有待办消息的数量
function getAllNumber (success) {
  baseservice.get('/gwmanage/gwportal/mygwapp/messagecenter/count/unread/all', {}, success)
}
// 按照类型获取查询列表
// {
//      type: 0/1,
//      pageIndex:0,
//      pageSize: 10
// }
function getMsgList (data, success) {
  baseservice.get('url/1', data, success)
}
export default {
  getAllNumber,
  getMsgList
}

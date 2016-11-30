/*
 * @author songhlc
 * @description http请求封装
 *
 * */
import {Vue} from 'src/eventbus/bus'

function error (response) {
  if (response.status === 500) {
    Vue.$bus.$emit('alert', {
      msgtitle: '发生错误',
      msgcontent: '请稍后重试!',
      type: 'danger'
    })
    Vue.$bus.$emit('loading', {
      show: false
    })
  }
}

function get (url, data, success) {
  Vue.http.get(url, {data: data, timeout: 10000}).then((response) => {
    let responsebody = response.json()
    if (responsebody.status === 1) {
      if (success && responsebody) {
        success(responsebody.data)
      }
    } else {
      if (responsebody.msg) {
        Vue.$bus.$emit('alert', {
          msgtitle: '操作失败',
          msgcontent: responsebody.msg,
          type: 'danger'
        })
      }
      Vue.$bus.$emit('loading', {
        show: false
      })
    }
  }, error)
}

function post (url, data, success) {
  Vue.http.post(url, data).then((response) => {
    let responsebody = response.json()
    if (responsebody.status === 1) {
      if (success && responsebody) {
        success(responsebody.data)
      }
    } else {
      if (responsebody.msg) {
        Vue.$bus.$emit('alert', {
          msgtitle: '操作失败',
          msgcontent: responsebody.msg,
          type: 'danger'
        })
      }
      Vue.$bus.$emit('loading', {
        show: false
      })
    }
  }, error)
}
function remove (url, data, success) {
  Vue.http.delete(url, {data: data, timeout: 10000}).then((response) => {
    let responsebody = response.json()
    if (responsebody.status === 1) {
      if (success && responsebody) {
        success(responsebody.data)
      }
    } else {
      if (responsebody.msg) {
        Vue.$bus.$emit('alert', {
          msgtitle: '操作失败',
          msgcontent: responsebody.msg,
          type: 'danger'
        })
      }
      Vue.$bus.$emit('loading', {
        show: false
      })
    }
  }, error)
}

function put (url, data, success) {
}
export default {
  get,
  post,
  remove,
  put
}

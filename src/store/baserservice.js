/*
 * @author songhlc
 * @description http请求封装
 *
 * */
import {Bus} from 'src/eventbus/bus'
import Vue from 'vue'

function error (response) {
  if (response.status === 500) {
    Bus.$emit('alert', {
      msgtitle: '发生错误',
      msgcontent: '请稍后重试!',
      type: 'danger'
    })
    Vue.$bus.$emit('loading', {
      show: false
    })
  }
}
// 判断是否是不按规则写的后台服务,如果是返回true 否则返回
function notCorrectRuleResponse (response) {
  if (!response.status && response.status !== 0) {
    return true
  } else {
    return false
  }
}

function get (url, data, success) {
  Vue.http.get(url, {data: data, timeout: 10000}).then((response) => {
    let responsebody = response.json()
    if (notCorrectRuleResponse(response)) {
      success(responsebody)
    }
    if (responsebody.status === 1) {
      if (success && responsebody) {
        success(responsebody.data)
      }
    } else {
      if (responsebody.msg) {
        Bus.$emit('alert', {
          msgtitle: '操作失败',
          msgcontent: responsebody.msg,
          type: 'danger'
        })
      }
      Bus.$emit('loading', {
        show: false
      })
    }
  }, error)
}

function post (url, data, success) {
  debugger
  Vue.http.post(url, data).then((response) => {
    let responsebody = response.json()
    if (notCorrectRuleResponse(response)) {
      success(responsebody)
    }
    if (responsebody.status === 1) {
      if (success && responsebody) {
        success(responsebody.data)
      }
    } else {
      if (responsebody.msg) {
        Bus.$emit('alert', {
          msgtitle: '操作失败',
          msgcontent: responsebody.msg,
          type: 'danger'
        })
      }
      Bus.$emit('loading', {
        show: false
      })
    }
  }, error)
}
function remove (url, data, success) {
  Vue.http.delete(url, {data: data, timeout: 10000}).then((response) => {
    let responsebody = response.json()
    if (notCorrectRuleResponse(response)) {
      success(responsebody)
    }
    if (responsebody.status === 1) {
      if (success && responsebody) {
        success(responsebody.data)
      }
    } else {
      if (responsebody.msg) {
        Bus.$emit('alert', {
          msgtitle: '操作失败',
          msgcontent: responsebody.msg,
          type: 'danger'
        })
      }
      Bus.$emit('loading', {
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

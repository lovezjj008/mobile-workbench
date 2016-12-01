<!--首页快捷待办-->
<template>
  <div class="ncontent" >
    <div class="alist fl um-grid" v-for="list in lists" v-show="list.isShow">
      <a @click="iframeRedirect(list.url, list.modal)" >
        <div class="title tc">{{list.text}}</div>
        <div class="f12 mt5 tc">{{list.title}}</div>
      </a>
    </div>
    <div class="alist fl um-grid nphoto">
      <a href="#toDo" @click="showTodo">
        <img src="../../assets/img/add.png" width=20>
      </a>
    </div>
  </div>
</template>
<script>
  import store from 'store'
  import service from 'src/store/action/todo'
  import Bus from 'src/eventbus/bus'
  import EVENTLIST from 'src/eventbus/eventlist'
  import {TODO_CUR} from 'src/const'

  export default {
    data () {
      return {
        lists: [],
        defaultList: []
      }
    },
    mounted () {
      this.queryCurTodo()
//      监听自定义显示待办列表项
      Bus.$on(EVENTLIST.TODO_CHANGE, () => {
        this.lists = store.get(TODO_CUR)
      })
    },
    methods: {
      queryCurTodo: function () {
        let todolist = store.get(TODO_CUR)
        if (todolist) {
          this.lists = todolist
        } else {
          service.getList((response) => {
            this.lists = response
            store.set(TODO_CUR, response)
          })
        }
      },
      showTodo: function () {
        window.UM.page.changePage({
          target: '#todo',
          isReverse: 0,
          transition: 'um'
        })
      },
      iframeRedirect (url, modal) {
        var ev = new window.Event('iframeChange')
        window.iframeurl = url
        window.iframetitle = modal
        window.dispatchEvent(ev)
        window.UM.page.changePage({
          target: '#iframe',
          isReverse: 0,
          transition: 'um'
        })
      }
    }
  }
</script>
<style scoped>
  .ncontent{
    margin-top: 10px;
  }
</style>

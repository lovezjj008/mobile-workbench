<!--首页快捷待办-->
<template>
  <div class="ncontent" >
    <div class="alist fl um-grid" v-for="list in lists" v-show="list.isShow">
      <a :href="list.url" >
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

  export default {
    data () {
      return {
        lists: [],
        defaultList: []
      }
    },
    mounted () {
      this.lists = store.get('todo_cur') || this.defaultList
//      监听自定义显示待办列表项
      Bus.$on(EVENTLIST.TODO_CHANGE, () => {
        this.lists = store.get('todo_cur')
      })
    },
    methods: {
      queryCurTodo: function () {
        service.getList((response) => {
          this.lists = response
        })
      },
      showTodo: function () {
        window.UM.page.changePage({
          target: '#todo',
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

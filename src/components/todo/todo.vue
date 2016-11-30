<template>
  <ul class="um-list">
    <li class="um-list-item" v-for="item in list" v-show="item.display">
      <div class="um-list-item-inner">
        <div class="um-list-item-body">
          {{item.title}}
        </div>
        <div class="um-list-item-right">
          <um-switch :id="item.id" :ischecked="item.isShow" v-on:change="change"></um-switch>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
  import {umSwitch} from 'components/umindex'
  import Bus from 'src/eventbus/bus'
  import EVENTLIST from 'src/eventbus/eventlist'
  import _ from 'lodash'
  import store from 'store'

  export default {
    components: {
      umSwitch
    },
    methods: {
      change: function (id, isShow) {
        let item = _.find(this.list, {id: id})
        item.isShow = isShow
        store.set('todo_cur', this.list)
//        待办事项改变
        Bus.$emit(EVENTLIST.TODO_CHANGE)
      }
    },
    mounted () {
      Bus.$on(EVENTLIST.TODO_SEARCH, function (keyword) {
        // 如果有关键字则按关键字查询并匹配出符合的条件
        if (keyword) {
          _.forEach(this.list, (o) => {
            if (o.title.indexOf(keyword) === -1) {
              o.display = false
            } else {
              o.display = true
            }
          })
        } else {
          _.forEach(this.list, (o) => {
            o.display = true
          })
        }
      }.bind(this))
      if (store.get('todo_cur')) {
        this.list = store.get('todo_cur')
      }
    },
    data () {
      return {
        list: [
          {
            id: 1,
            text: 5,
            title: '待定标',
            isShow: false,
            display: true
          },
          {
            id: 2,
            text: 5,
            title: '待收货',
            isShow: false
          },
          {
            id: 3,
            text: 5,
            title: '待确认对账单',
            isShow: false
          },
          {
            id: 4,
            text: 5,
            title: '待发布',
            isShow: false
          }
        ]
      }
    }
  }
</script>
<style scoped>
  .um-list-item-body{
    padding-left:15px;
  }
</style>

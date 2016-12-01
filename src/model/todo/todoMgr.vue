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
  import {TODO_CUR} from 'src/const'

  export default {
    components: {
      umSwitch
    },
    methods: {
      change: function (id, isShow) {
        let item = _.find(this.list, {id: id})
        item.isShow = isShow
        store.set(TODO_CUR, this.list)
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
      if (store.get(TODO_CUR)) {
        this.list = store.get(TODO_CUR)
      }
    },
    data () {
      return {
        list: [
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

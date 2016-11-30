<template>
  <div class="um-input-search">
    <a href="#" class="um-back" onclick="back()"></a>
    <input type="search" class="form-control" placeholder="搜索" v-model="keyword" debounce="300">
  </div>
</template>
<script>
  import Bus from 'src/eventbus/bus'
  import EVENTLIST from 'src/eventbus/eventlist'
  import _ from 'lodash'

  export default {
    watch: {
      keyword (val, oldVal) {
        this.queryByKeyWord(val)
      }
    },
    methods: {
      queryByKeyWord: _.debounce(val => {
        Bus.$emit(EVENTLIST.TODO_SEARCH, val)
      }, 300)
    },
    data () {
      return {
        keyword: '',
        delayTime: 300,
        delayedAction: ''
      }
    }
  }
</script>

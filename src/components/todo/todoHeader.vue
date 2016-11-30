<template>
  <div class="um-input-search">
    <a href="#" class="um-back" onclick="back()"></a>
    <input type="search" class="form-control" placeholder="搜索" v-model="keyword" debounce="300">
  </div>
</template>
<script>
  import Bus from 'src/eventbus/bus'
  import EVENTLIST from 'src/eventbus/eventlist'

  export default {
    methods: {
    },
    watch: {
      keyword: function (val, oldVal) {
        Bus.$emit(EVENTLIST.TODO_SEARCH, val)
      }
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

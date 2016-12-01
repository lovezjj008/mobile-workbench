<template>
  <div id='uappmanager'>

  </div>
</template>
<script>
  import AppManager from './AppManager'
  import action from '../../../src/store/action/application'

  export default {
    mounted () {
      action.getList((data) => {
        this.applist.data = data
        new AppManager('#uappmanager', this.applist)
//        console.log(_app)
      })
    },
    data () {
      return {
        applist: {
          el: '#uappmanager',
          data: [],
          colum: 4
        }
      }
    }
  }
</script>
<style scoped>
  #uappmanager {
    margin-top: 10px;
    background: #ffffff;
  }
</style>

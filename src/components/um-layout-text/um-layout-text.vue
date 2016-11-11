<template>
  <div class="ncontent" >
    <div class="alist fl um-grid" v-for="list in lists">
      <a :href="list.url">
        <div class="title tc">{{list.text}}</div>
        <div class="f12 mt5 tc">{{list.title}}</div>
      </a>
    </div>
    <div class="alist fl um-grid nphoto">
      <a href="#toDo">
        <img src="../../assets/img/add.png" width=20>
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        lists: [
          {title: '待定标', text: '12', 'url': 'http://www.baidu.com'},
          {title: '待收货', text: '3', 'url': 'http://www.baidu.com'},
          {title: '待确认对', text: '3', 'url': 'http://www.baidu.com'},
          {title: '待发布', text: '5', 'url': 'http://www.baidu.com'},
          {title: '待审批', text: '1', 'url': 'http://www.baidu.com'}
        ]
      }
    }
  }
</script>

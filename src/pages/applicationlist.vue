<!--app管理页面,选择需要添加到首页的管理页面-->
<template>
  <div class="applicationlist">
    <div id="appclassify">
      <ul id="appcategory" >
        <li v-for="(item, index) in categoryList" :class="{active:(index==0)?true:false}"><a :attr-href="'#category'+item.categoryId">{{item.categoryName}}</a></li>
      </ul>
    </div>
    <div id="applist" class="um-applist">
      <div id="applistScroll" v-for="category in categoryList">
        <div class="um-appitem" :id="'category' + category.categoryId" :data-v="'category' + category.categoryId">
          <h6 class="title">{{category.categoryName}}</h6>
          <div class="um-listview-wrap">
            <ul class="um-list um-no-active" >
              <li class="um-listview-row" v-for="app in category.applist">
                <a class="um-list-item um-swipe-action um-no-icon">
                  <div class="um-list-item-media msg-info">
                    <img alt="" :src="app.iconurl" width=40>
                  </div>
                  <div class="um-list-item-inner">
                    <div class="um-list-item-body">
                      <h4 class="um-media-heading f14 um-text-overflow">{{app.appname}}</h4>
                      <p class="um-gray f12 um-text-overflow">{{app.appdesc}}</p>
                    </div>
                    <div class="pr10">
                      <um-switch :ischecked="app.isShow"></um-switch>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {umSwitch} from 'components/umindex'

  let $ = window.$
  export default {
    components: {
      umSwitch
    },
    mounted () {
//    调用iuap mobile的组件
      $('#appcategory').onePageNav()
    },
    data () {
      return {
        categoryList: [
          {
            categoryId: '1',
            categoryName: '采购应用',
            applist: [
              {
                appname: '采购需求',
                appdesc: '暂无详情',
                isShow: true,
                iconurl: 'static/img/goods/1.png'
              },
              {
                appname: '发布询价',
                appdesc: '暂无详情',
                isShow: false,
                iconurl: 'static/img/goods/2.png'
              },
              {
                appname: '定标',
                appdesc: '暂无详情',
                isShow: false,
                iconurl: 'static/img/goods/2.png'
              },
              {
                appname: '采购订单',
                appdesc: '暂无详情',
                isShow: true,
                iconurl: 'static/img/goods/3.png'
              },
              {
                appname: '发布询价',
                appdesc: '暂无详情',
                isShow: false,
                iconurl: 'static/img/goods/2.png'
              },
              {
                appname: '定标',
                appdesc: '暂无详情',
                isShow: false,
                iconurl: 'static/img/goods/2.png'
              },
              {
                appname: '采购订单',
                appdesc: '暂无详情',
                isShow: true,
                iconurl: 'static/img/goods/3.png'
              },
              {
                appname: '发布询价',
                appdesc: '暂无详情',
                isShow: false,
                iconurl: 'static/img/goods/2.png'
              },
              {
                appname: '定标',
                appdesc: '暂无详情',
                isShow: false,
                iconurl: 'static/img/goods/2.png'
              },
              {
                appname: '采购订单',
                appdesc: '暂无详情',
                isShow: true,
                iconurl: 'static/img/goods/3.png'
              }
            ]
          },
          {
            categoryId: '2',
            categoryName: '销售应用',
            applist: [
              {
                appname: '报价',
                appdesc: '暂无详情',
                isShow: true,
                iconurl: 'static/img/goods/1.png'
              },
              {
                appname: '销售订单',
                appdesc: '暂无详情',
                isShow: false,
                iconurl: 'static/img/goods/2.png'
              },
              {
                appname: '销售发票',
                appdesc: '暂无详情',
                isShow: true,
                iconurl: 'static/img/goods/3.png'
              }
            ]
          }
        ]
      }
    }
  }
</script>
<style scoped>
  .applicationlist{
    display: -webkit-box;
    display: box;
    display: -webkit-flex;
    display: flex;
    overflow: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    -webkit-box-flex: 1;
    box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    -webkit-transform-origin: top center;
    transform-origin: top center;
    height: 100%;
  }#appclassify{
     position:relative;
     width:25%;
     height:100%;
   }
  #appclassify ul{
    width:100%; background:#fff;
  }
  #appclassify ul li{
    height:45px; line-height:45px;
    padding-left:10px;
    font-size:12px;
    background: #f6f6f6;
    border-left:2px solid #f6f6f6;
  }
  #appclassify ul li a{
    display:block;
    width:100%;
    height:100%;
    color:#666666;
  }
  #appclassify ul li.active {
    background: #ffffff;
    border-left: 2px solid rgba(241, 90, 74, 1);
  }
  #applist{
    width:75%;
    border-left:1px solid #E6E6E6;
    overflow:scroll;
  }
  #applist .title{
    font-size:12px;
    font-weight:normal;
    padding-left:10px;
    line-height:25px;
    color:#C2C2C2;
    position:relative;
  }
  #applist .um-appitem{
    overflow:hidden;
  }
  #applist .um-media-heading{
    margin:0;
  }

</style>

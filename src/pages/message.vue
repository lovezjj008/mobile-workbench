<template>
  <div class="um-listview-wrap" id="listview">
    <ul class="um-list um-no-active"  >
    <li class="um-listview-row" v-for="list in lists">
      <a :href="list.url" class="um-list-item um-swipe-action um-no-icon bd-1px-b">
        <div class="um-swipe-btns">
          <span class="um-swipe-btn um-delete">删除</span>
          </div>
        <div class="um-list-item-media msg-info">
          <img  v-bind:src="list.img" width=50>
          <span class="um-badge">{{list.msgNum}}</span>
          </div>
        <div class="um-list-item-inner ml5">
          <div class="um-list-item-body">
            <h4 class="um-media-heading fb f16 um-text-overflow tl" >{{list.sender}}</h4>
            <p class="um-gray f14 um-text-overflow tl">{{list.lastMsg}}</p>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  import service from 'src/store/action/message'

  export default {
    data () {
      return {
        lists: [
          {
            url: '1',
            img: './static/img/org2.png',
            sender: '业务消息',
            lastMsg: '供应商拒绝采购商推送的合同信息',
            msgNum: 0
          },
          {
            url: '1',
            img: './static/img/org3.png',
            sender: '协同消息',
            lastMsg: '采购商拒绝采购商推送的合同信息',
            msgNum: 0
          },
          {
            url: '1',
            img: './static/img/org4.png',
            sender: '系统消息',
            lastMsg: '新用户',
            msgNum: 0
          }
        ]
      }
    },
    mounted () {
//       查询所有的未读消息
      service.getAllNumber(response => {
        this.lists[0] = 100
      })
    }
  }
</script>

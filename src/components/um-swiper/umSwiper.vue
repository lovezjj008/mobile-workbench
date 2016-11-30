<template>
  <div class="um-row">
    <swiper>
      <swiper-slide v-for="item in picList">
        <img :src="item.content" alt="">
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    mounted () {
      this.picList = [
        {content: 'static/img/g2.jpg'},
        {content: 'static/img/g3.jpg'}
      ]
    },
    data () {
      return {
        picList: [],
        swiperOption: {
          // 如果你后续需要找到当前实例化后的swiper对象以对其进行一些操作的话，可以自定义配置一个名字
          name: 'currentSwiper',
          // 所有配置均为可选（同Swiper配置）
          autoplay: 3000,
          direction: 'vertical',
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          scrollbar: '.swiper-scrollbar',
          mousewheelControl: true,
          observeParents: true,
          // if you need use plugins in the swiper, you can config in here like this
          debugger: true,
          // swiper callbacks
          onTransitionStart: function (swiper) {
            console.log(swiper)
          }
          // more Swiper config ...
          // ...
        }
      }
    }
  }

</script>
<style scoped>
  img{
    width: 100%;
  }
</style>

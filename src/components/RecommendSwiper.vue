<template>
  <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
    <!-- slides -->
    <swiper-slide v-for="item in recommends" :key="item.id">
      <a :href="item.jumpurl"><img :src="item.pic"></a>
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: ['recommends'],
  data: function () {
    return {
      notNextTick: true,
      swiperOption: {
        autoplay: 3000,
        loop: true,
        grabCursor: true,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        observeParents: true
      }
    }
  },
  // 定义sweiper对象
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>


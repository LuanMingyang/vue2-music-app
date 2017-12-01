<template>
  <div class="page-title-wrap">
    <p>
      <i class="iconfont btn-back" @click="goBack">&#xe605;</i>
      {{ title }}
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    goBack: function () {
      window.history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
$pageTitleHeight: 45px;

.page-title-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  color: #fff;
  background-color: #41B883;
  text-align: center;
  line-height: $pageTitleHeight;

  .btn-back {
    position: absolute;
    left: 10px;
    font-size: 20px;
  }
}
</style>

<template>
  <p class="part-title">{{ partTitle }} <i class="iconfont icon-more">&#xe602;</i></p>
</template>

<script>
export default {
  props: ['partTitle']
}
</script>

<style lang="scss" scoped>
  .part-title {
    position: relative;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
  }

  .icon-more {
    position: absolute;
    right: 15px;
    font-size: 20px;
    color: #999;
  }
</style>

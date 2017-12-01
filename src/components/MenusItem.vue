<template>
  <li class="menu">
    <router-link :to="to">
      <i class="iconfont" v-html="iconfont"></i>
      <span>{{ title }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['to', 'iconfont', 'title']
}
</script>

<style lang="scss" scoped>
  .menu {
    float: left;
    padding-left: 15px;
    width: 33.33%;
    font-size: 14px;
    line-height: 60px;

    &:nth-child(2) {
      padding-left: 25px;
    }

    &:nth-child(5) {
      padding-left: 25px;
    }
  }

  .iconfont {
    font-size: 24px;
    color: #41B883;
    vertical-align: middle;
  }
</style>

<template>
  <ul class="sub-nav clearfix">
    <menus-item v-for="(item, index) in menuList" :key="index" :to="item.href" :iconfont="item.iconfont" :title="item.title"></menus-item>
  </ul>
</template>

<script>
import MenusItem from './MenusItem'

var menuList = [
  {
    iconfont: '&#xe68d;',
    title: '歌手',
    href: '/singer'
  },
  {
    iconfont: '&#xe6c5;',
    title: '排行',
    href: '/rank'
  },
  {
    iconfont: '&#xe601;',
    title: '电台',
    href: '/radio'
  },
  {
    iconfont: '&#xe6ae;',
    title: '分类歌单',
    href: '/songList'
  },
  {
    iconfont: '&#xe63a;',
    title: '视频MV',
    href: '/mv'
  },
  {
    iconfont: '&#xe603;',
    title: '数字专辑',
    href: '/album'
  }
]

export default {
  data: function () {
    return {
      menuList: menuList
    }
  },
  components: {
    MenusItem
  }
}
</script>

<style lang="scss" scoped>
  .sub-nav {
    padding: 10px 0;
  }
</style>

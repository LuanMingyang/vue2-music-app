<template>
  <header id="header">
    <div class="main-nav-wrap">
      <i class="btn-left-menu iconfont">&#xe60b;</i>
      <ul class="main-nav clearfix">
        <li v-bind:class="[activeIndex===0 ? 'active' : '']"><router-link to="/user">我的</router-link></li>
        <li v-bind:class="[activeIndex===1 ? 'active' : '']"><router-link to="/">音乐馆</router-link></li>
        <li v-bind:class="[activeIndex===2 ? 'active' : '']"><router-link to="/discover">发现</router-link></li>
      </ul>
      <i class="btn-right-menu iconfont">&#xe600;</i>
    </div>
    <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
      <div v-show="!scrolled" class="search-wrap">
        <input @click="search" class="search-input" type="text" placeholder="搜索">
      </div>
    </transition>
  </header>
</template>

<script>
import router from '../router'

export default {
  props: ['activeIndex'],
  data: function () {
    return {
      scrolled: false
    }
  },
  methods: {
    // 监听滚动方向及距离
    handleScroll: function () {
      var beforeScrollY = window.scrollY
      window.addEventListener('scroll', () => {
        var afterScrollY = window.scrollY
        var diffY = afterScrollY - beforeScrollY
        if (diffY > 25) { // 向下滚动距离大于25
          this.scrolled = true
        } else if (diffY < -10) { // 向上滚动
          this.scrolled = false
        }
        beforeScrollY = afterScrollY
      }, false)
    },
    search: function () {
      router.push('search')
    }
  },
  mounted: function () {
    this.handleScroll()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: #fff;
    background-color: #41B883;
    z-index: 999;
  }

  .main-nav-wrap .iconfont {
    position: absolute;
    top: 0;
    font-size: 22px;
    line-height: 45px;

    &.btn-left-menu {
      left: 15px;
    }

    &.btn-right-menu {
      right: 15px;
    }
  }

  .main-nav {
    margin: 0 auto;
    width: 56%;
    text-align: center;
  }

  .main-nav li {
    float: left;
    width: 33.3%;
    line-height: 45px;

    &.active {
      font-size: 1.2em;
      font-weight: 600;
    }
  }

  a {
    color: #fff;
  }

  .search-wrap {
    padding: 0 5px 5px 5px;
    height: 35px;
  }

  .search-input {
    padding-left: 10px;
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 14px;
    border-radius: 3px;
    background-color: #38a675;

    &::-webkit-input-placeholder {
      font-family: 'iconfont' !important;
      color: #fff;
      text-align: center;
    }
  }

  .search-input::-webkit-input-placeholder::before {
    font-family: 'iconfont';
    content: '&#xe689;';
  }

</style>

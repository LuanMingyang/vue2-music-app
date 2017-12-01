<template>
  <div class="container">
    <head-nav :activeIndex="activeIndex"></head-nav>
    <footer>
      <player-bar></player-bar>
    </footer>
  </div>
</template>

<script>
// 导入要用到的子组件
import HeadNav from '../components/HeadNav'
import PlayerBar from '../components/PlayerBar'
import { mapActions } from 'vuex'

export default {
  data: function () {
    return {
      activeIndex: 0
    }
  },
  // 在components字段中，包含导入的子组件
  components: {
    HeadNav,
    PlayerBar
  },
  methods: {
    ...mapActions([
      'stateInit'
    ])
  }
}
</script>

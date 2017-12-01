<template>
  <div class="recom-list-wrap">
    <part-title :partTitle="'M V 推 荐'"></part-title>
    <ul class="recom-list">
      <li v-for="item in recomMVist" :key="item.mv_id">
        <img :src="item.picurl">
        <span class="play-amount"><i class="iconfont">&#xe6df;</i> {{ item.listennum | playAmount }}</span>
        <span class="play-btn"><i class="iconfont">&#xe62b;</i></span>
        <div class="desc-wrap">
          <p class="mvtitle">{{ item.mvtitle }}</p>
          <p class="singer">{{ item.singer_name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import PartTitle from './PartTitle'

export default {
  props: ['recomMVist'],
  components: {
    PartTitle
  },
  filters: {
    playAmount: function (amount) {
      return parseInt(amount / 10000) + '万'
    }
  }
}
</script>

<style lang="scss" scoped>
  .recom-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .recom-list li {
    position: relative;
    margin-top: 5px;
    width: 49.5%;
  }

  .desc-wrap {
    padding: 5px 2px;
  }

  .mvtitle,
  .singer {
    font-size: 12px;
  }

  .singer {
    color: #999;
  }

  .play-amount {
    position: absolute;
    bottom: 45px;
    left: 5px;
    font-size: 12px;
    color: #fff;
    
    .iconfont {
      font-size: 18px;
      vertical-align: text-bottom;
    }
  }

  .play-btn {
    position: absolute;
    bottom: 45px;
    right: 5px;
    color: rgba(255, 255, 255, 0.7);

    .iconfont {
      font-size: 20px;
    }
  }
</style>

<template>
  <div class="recom-list-wrap">
    <part-title :partTitle="'歌 单 推 荐'"></part-title>
    <ul class="recom-list">
      <li v-for="item in recomSongList" :key="item.dissid">
        <img :src="item.imgurl">
        <span class="play-amount"><i class="iconfont">&#xe6a8;</i> {{ item.listennum | playAmount }}</span>
        <span class="play-btn"><i class="iconfont">&#xe62b;</i></span>
        <div class="desc-wrap">
          <p class="desc">{{ item.dissname }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import PartTitle from './PartTitle'

export default {
  props: ['recomSongList'],
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
    width: 32.8%;
  }

  .desc-wrap {
    padding: 5px 2px;
  }

  .desc {
    font-size: 12px;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .play-amount {
    position: absolute;
    bottom: 45px;
    left: 5px;
    font-size: 12px;
    color: #fff;
    
    .iconfont {
      font-size: 12px;
    }
  }

  .play-btn {
    position: absolute;
    bottom: 45px;
    right: 5px;
    color: rgba(255, 255, 255, 0.5);

    .iconfont {
      font-size: 20px;
    }
  }
</style>

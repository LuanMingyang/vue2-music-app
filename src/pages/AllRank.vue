<template>
  <div class="container">
    <header>
      <page-title :title="'排行'"></page-title>
    </header>
    <div class="content">
      <p class="part-title">Q Q 音 乐 巅 峰 榜</p>
      <ul class="rank-list">
        <li class="rank clearfix" v-for="rank in rankList" :key="rank.id" @click="intoRank(rank.id)">
          <div class="rank-img-wrap">
            <img class="rank-img" :src="rank.picUrl">
            <span class="play-amount"><i class="iconfont">&#xe6a8;</i> {{ rank.listenCount | playAmount }}</span>
            <span class="play-btn"><i class="iconfont">&#xe62b;</i></span>
          </div>
          <div class="rank-top-three-wrap">
            <ul class="rank-top-three">
              <li v-for="(song, index) in rank.songList" :key="index">
                <p class="song">{{ parseInt(index) + 1 }} {{ song.songname }} - <span class="singer">{{ song.singername }}</span></p>
              </li>
            </ul>
          </div>
          <div class="btn-open-wrap">
            <i class="iconfont btn-open">&#xe606;</i>
          </div>
        </li>
      </ul>
    </div>

    <footer>
      <player-bar></player-bar>
    </footer>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle'
import PlayerBar from '../components/PlayerBar'
import router from '../router'
import API from '../config/api'

export default {
  components: {
    PageTitle,
    PlayerBar
  },
  data: function () {
    return {
      rankList: []
    }
  },
  methods: {
    intoRank: function (topid) {
      router.push({ name: 'rank', params: { topid } }) 
    }
  },
  filters: {
    playAmount: function (amount) {
      return parseInt(amount / 10000) + '万'
    }
  },
  mounted: function () {
    // 请求排行榜数据
    this.$http.jsonp(API.URL_TOPLIST_OPT,
      {
        params: {
          _: new Date().getTime()
        },
        jsonp: 'jsonpCallback'
      }
    ).then((response) => {
      console.log(response.data)
      this.rankList = response.data.data.topList
    }).catch(function (response) {
      console.log(response)
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #f5f5f5;
}

.part-title {
  text-align: center;
  line-height: 50px;
}

.rank-list {
  padding: 0 12px;

  .rank {
    position: relative;
    margin-bottom: 10px;
    background-color: #fff;
  }
}

.rank-img-wrap {
  position: relative;
  float: left;
  width: 100px;

  .rank-img {
    width: 100%
  }

  .play-amount {
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-size: 12px;
    color: #fff;
    
    .iconfont {
      font-size: 12px;
    }
  }

  .play-btn {
    position: absolute;
    bottom: 5px;
    right: 5px;
    color: rgba(255, 255, 255, 0.5);

    .iconfont {
      font-size: 20px;
    }
  }
}

.rank-top-three-wrap {
  float: left;
  padding: 5px 0;
  width: 60%;

  .song {
    padding-left: 10px;
    width: 100%;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
    .singer {
      color: #999;
    }
  }
}

.btn-open-wrap {
  float: left;
  height: 100%;

  .btn-open {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    padding: 50px 10px;
  }
}

button {
  padding: 15px;
}
</style>

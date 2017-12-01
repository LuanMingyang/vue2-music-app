<template>
  <div class="container">
    <!-- 搜索框 -->
    <div class="search-input-wrap">
      <i class="iconfont btn-cancel" @click="back">&#xe605;</i>
      <input @keyup="search(undefined, true)" @keyup.enter="search(undefined, false)" v-model="searchKey" type="text" class="search-input" id="search-input" placeholder="搜索音乐、歌词、歌单">
      <i class="iconfont btn-clear" @click="clearInput">&#xe65d;</i>
    </div>
    <!-- 热门搜索 -->
    <div class="hot-search part clearfix" v-show="!searched">
      <p class="title">热门搜索</p>
      <ul class="hot-key-list">
        <li v-for="hotKey in hotKeys" :key="hotKey.n" @click="search(hotKey.k.trim())">{{ hotKey.k.trim() }}</li>
      </ul>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history part" v-show="!searched && searchHistory.length > 0">
      <p class="title">搜索历史 <span class="btn-clear-history" @click="clearHistory">清空历史</span></p>
      <ul class="search-history-list">
        <li v-for="(key, index) in searchHistory" :key="index" @click="search(key)">
          {{ key }}
          <i class="iconfont btn-delete" @click.stop="deleteSearchHistory(index)">&#xe65d;</i>
        </li>
      </ul>
    </div>
    <!-- 搜索结果 -->
    <div class="search-result-wrap" v-if="searched && searchResult !== null">
      <!-- 搜索结果导航 -->
      <ul class="result-nav">
        <li :class="[activeIndex === 0 ? 'active' : '']" @click="changeSearch(0)"><span>单曲</span></li>
        <li :class="[activeIndex === 1 ? 'active' : '']" @click="changeSearch(1)"><span>MV</span></li>
        <li :class="[activeIndex === 2 ? 'active' : '']" @click="changeSearch(2)"><span>专辑</span></li>
        <li :class="[activeIndex === 3 ? 'active' : '']" @click="changeSearch(3)"><span>歌单</span></li>
        <li :class="[activeIndex === 4 ? 'active' : '']" @click="changeSearch(4)"><span>歌词</span></li>
      </ul>
      <!-- 单曲搜索结果 -->
      <div class="search-result search-song" v-if="activeIndex === 0">
        <!-- 最佳匹配 -->
        <router-link :to="'/singer/' + singer.mid"  v-if="singer !== undefined && singer !== null">
          <div class="best-match-wrap clearfix">
            <p class="best-match-title">最佳匹配</p>
            <div class="best-match">
              <img class="singer-img" :src="singer.pic">
              <div class="singer-text">
                <p class="singer-name">歌手:{{ singer.name }}</p>
                <p class="singer-data">单曲:{{ searchResult.zhida.zhida_singer.songNum }} 专辑:{{ searchResult.zhida.zhida_singer.albumNum }}</p>
              </div>
              <i class="iconfont btn-enter">&#xe606;</i>
            </div>
          </div>
        </router-link>
        <!-- 单曲列表 -->
        <ul class="song-list">
          <song-list-item v-for="(song, index) in searchResult.song.list" :key="song.id" 
          :songList="searchResult.song.list" :song="song" :songid="song.id" :sindex="index" :songname="song.name" :isOnly="song.isonly" :haveMV="song.mv.id !== 0"
          :singer="song.singer[0].name" :album="song.album.name"></song-list-item>
        </ul>
      </div>
      <!-- MV搜索结果 -->
      <div class="search-result search-mv" v-if="activeIndex === 1">
        <!-- MV列表 -->
        <ul class="mv-list">
          <li v-for="mv in searchResult.mv.list" :key="mv.mv_id" class="mv clearfix">
            <div class="mv-img-wrap">
              <img class="mv-img" :src="mv.mv_pic_url">
              <span class="mv-play-amount"><i class="iconfont">&#xe6df;</i> {{ mv.play_count | playAmountFormat }}</span>
            </div>
            <div class="mv-info-wrap">
              <div class="mv-info">
                <p class="mv-name">{{ mv.mv_name }}</p>
                <p><span class="mv-singer">{{ mv.singer_name }}</span> <span class="mv-duration">{{ mv.duration | durationFormat }}</span></p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 专辑搜索结果 -->
      <div class="search-result search-album" v-if="activeIndex === 2">
        <!-- 专辑列表 -->
        <ul class="album-list">
          <album-or-m-v-list-item v-for="album in searchResult.album.list" :key="album.albumID" :type="'album'" :name="album.albumName" 
            :pic="album.albumPic" :singer="album.singerName" :publicTime="album.publicTime" :showInto="false">
          </album-or-m-v-list-item>
        </ul>
      </div>
      <!-- 歌单搜索结果 -->
      <div class="search-result search-songList" v-if="activeIndex === 3">
        <p>暂无数据</p>
      </div>
      <!-- 歌词搜索结果 -->
      <div class="search-result search-lyric" v-if="activeIndex === 4">
        <p>暂无数据</p>
      </div>
    </div>
    <!-- 底部播放条 -->
    <footer>
      <player-bar></player-bar>
    </footer>
  </div>
</template>

<script>
import PlayerBar from '../components/PlayerBar'
import SongListItem from '../components/SongListItem'
import AlbumOrMVListItem from '../components/AlbumOrMVListItem'
import API from '../config/api'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    PlayerBar,
    SongListItem,
    AlbumOrMVListItem
  },
  data: function () {
    return {
      hotKeys: [], // 热门搜索
      searchHistory: [], // 历史搜索
      searchKey: '', // 当前搜索关键字
      searched: false, // 是否已搜索（false 则显示 热门搜索和搜索历史）
      activeIndex: 0, // 标志 搜索结果导航 当前active
      singer: null, // 智能搜索得到的最佳匹配歌手
      searchResult: null // 搜索结果
    }
  },
  methods: {
    // 返回
    back: function () {
      window.history.back()
    },
    // 清空搜素框
    clearInput: function () {
      this.searchKey = ''
      this.searched = false
      document.getElementById('search-input').focus()
    },
    // 搜索 (autoSearch表示是否为自动搜索，只有在不是自动搜索时 才会存储搜索记录)
    search: function (key = this.searchKey, autoSearch = false) {
      // 清空上一次的搜索结果
      this.singer = null
      this.searchResult = null

      var url = ''
      switch (this.activeIndex) {
        case 0:
          url = API.URL_SEARCH_CLIENT_SONG // 单曲搜索
          break
        case 1:
          url = API.URL_SEARCH_CLIENT_MV // MV搜索
          break
        case 2:
          url = API.URL_SEARCH_CLIENT_ALBUM // 专辑
          break
        case 3:
          url = API.URL_SEARCH_CLIENT_DISS // 歌单
          break
        case 4:
          url = API.URL_SEARCH_SMARTBOX // 应该为歌词搜索 由于没有找到API，目前暂时为 智能搜索
          break
      }
      if (key !== '') {
        this.searched = true
        this.searchKey = key

        // 切换到单曲搜索时 要同时请求智能搜索接口 是否有最佳匹配歌手
        if (this.activeIndex === 0) {
          this.$http.jsonp(API.URL_SEARCH_SMARTBOX,
            {
              params: {
                key: key // 用于智能搜索时的 关键字
              },
              jsonp: 'jsonpCallback'
            }
          ).then((response) => {
            // console.log(response.data.data.singer.itemlist[0])
            this.singer = response.data.data.singer.itemlist[0]
          }).catch(function (response) {
            console.log(response)
          })
        }
        // 请求搜索数据
        this.$http.jsonp(url,
          {
            params: {
              w: key, // 用于单曲、MV、专辑搜索时的 关键字
              query: key // 用于歌单搜索时的 关键字
              // p: 1, // 页码
              // n: 10, // 页大小
              // page_no: 1, // 页码
              // num_per_page: 10 // 页大小
            },
            jsonp: 'jsonpCallback'
          }
        ).then((response) => {
          // console.log(response.data.data)
          this.searchResult = response.data.data
          // 不是自动搜索时 才存储搜索历史
          if (!autoSearch) {
            // 存储搜索历史
            var index = this.searchHistory.indexOf(key)
            if (index !== -1) {
              this.searchHistory.splice(index, 1)
            }
            this.searchHistory.unshift(key)
            this.searchHistory = this.searchHistory.slice(0, 10)
            localStorage.searchHistory = JSON.stringify(this.searchHistory)
          }
        }).catch(function (response) {
          console.log(response)
        })
      } else {
        this.searched = false
      }
    },
    // 删除某一搜索记录
    deleteSearchHistory: function (index) {
      this.searchHistory.splice(index, 1)
      localStorage.searchHistory = JSON.stringify(this.searchHistory)
    },
    // 清空搜索历史
    clearHistory: function () {
      this.searchHistory = []
      localStorage.searchHistory = JSON.stringify(this.searchHistory)
    },
    // 切换搜索
    changeSearch: function (index) {
      this.activeIndex = index
      this.search()
    }
  },
  filters: {
    // 格式化 mv时长
    durationFormat: function (duration) {
      var minutes = parseInt(duration / 60)
      var seconds = duration % 60
      return (Array(2).join(0) + minutes).slice(-2) + ':' + (Array(2).join(0) + seconds).slice(-2)
    },
    // 格式化 mv播放量
    playAmountFormat: function (amount) {
      return (amount / 10000).toFixed(1) + '万'
    }
  },
  created: function () {
    // 修改背景颜色
    document.body.style.backgroundColor = '#f5f5f5'
    // 获取热门搜索
    this.$http.jsonp(API.URL_HOT_KEY,
      {
        jsonp: 'jsonpCallback'
      }
    ).then((response) => {
      // console.log(response.data.data)
      this.hotKeys = response.data.data.hotkey.slice(0, 8)
    }).catch(function (response) {
      console.log(response)
    })

    // 获取搜索历史
    if (localStorage.searchHistory) {
      this.searchHistory = JSON.parse(localStorage.searchHistory)
    }
  },
  mounted: function () {
    // 输入框获取焦点
    document.getElementById('search-input').focus()
  }
}
</script>

<style lang="scss" scoped>
$inputHeight: 45px;
$paddingLeft: 25px;

.search-input-wrap {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: $inputHeight;
  color: #fff;
  line-height: $inputHeight;
  background-color: #41B883;

  .search-input {
    padding: 5px 40px;
    width: 100%;
    height: 100%;
    font-size: 16px;
    color: #fff;
    font-weight: lighter;
    vertical-align: top;
    background-color: transparent;

    &::-webkit-input-placeholder {
      color: #eee;
    }
  }

  .btn-cancel {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 8px;
    font-size: 24px;
  }

  .btn-clear {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 11px;
    font-size: 18px;
  }
}

.part {
  margin: 20px 0;

  .title {
    padding: 0 $paddingLeft;
    font-size: 14px;
    color: #999;
    line-height: 40px;
  }
}

.hot-key-list {
  padding: 0 $paddingLeft;

  li {
    float: left;
    margin: 0 5px 10px 0;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
}

.btn-clear-history {
  float: right;
  color: #41B883;
}

.search-history-list {
  li {
    padding-left: $paddingLeft;
    line-height: 50px;
    background-color: #fff;
    border-bottom: 0.5px solid #ccc;

    .btn-delete {
      float: right;
      padding: 0 $paddingLeft;
      font-size: 12px;
      color: #ccc;
      font-weight: 300;
    }
  }

  li:nth-child(1) {
    border-top: 0.5px solid #ccc;
  }
}

.result-nav {
  position: fixed;
  top: $inputHeight;
  left: 0;
  z-index: 999;
  width: 100%;
  background-color: #fff;
  border-bottom: 0.5px solid #eee;

  li {
    float: left;
    padding: 0 3px;
    width: 20%;
    text-align: center;
    line-height: $inputHeight;

    span {
      display: block;
      width: 100%;
    }

    &.active {
      span {
        color: #41B883;
        border-bottom: 5px solid #41B883;
      }
    }
  }
}

.search-result {
  margin-top: $inputHeight + 5;
  background-color: #fff;
}

.search-song {
  padding-left: 10px;
}

.best-match-wrap {
  border-bottom: 0.5px solid #ddd;

  .best-match-title {
    font-size: 14px;
    color: #999;
    line-height: 40px;
  }

  .best-match {
    position: relative;

    .singer-img {
      float: left;
      padding: 8px 0;
      width: 58px;
      border-radius: 50%;
    }

    .singer-text {
      float: left;
      padding: 15px 0 15px 10px;
      // line-height: 68px;

      .singer-data {
        font-size: 14px;
        color: #666;
      }
    }
    
    .btn-enter {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 10px;
      font-size: 20px;
      line-height: 74px;
    }
  }
}

.mv {
  position: relative;
  margin-bottom: 2px;

  .mv-img-wrap {
    position: relative;

    .mv-img {
      float: left;
      width: 36%;
    }

    .mv-play-amount {
      position: absolute;
      left: 5px;
      bottom: 5px;
      font-size: 14px;
      color: #fff;

      .iconfont {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  .mv-info-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    // margin-left: 10px;
    width: 61%;
    color: #000;
    border-bottom: 0.5px solid #ddd;

    .mv-info {
      position: absolute;
      top: 50%;
      padding-right: 10px;
      transform: translateY(-50%);
      line-height: 30px;
    }

    .mv-name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .mv-singer {
      font-size: 14px;
      margin-right: 6px;
    }

    .mv-duration {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>

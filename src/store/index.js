import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: function () {
    return {
      playMethod: 0, // 播放方式：0列表循环，1单曲循环，2随机播放
      playerShow: false, // 是否显示播放器
      playlist: [], // 播放列表
      playlistShow: false, // 是否显示播放列表
      // 当前正在播放的歌曲
      song: {
        id: null, // 歌曲id
        name: '', // 歌曲名
        album: {
          mid: '' // 专辑id
        },
        lyric: {
          lyric: '',
          lyricArr: [],
          timeArr: []
        }
      },
      songIndex: null, // 当前歌曲在播放列表中的下标
      duration: 0, // 当前歌曲的总时长
      playingTime: 0, // 当前歌曲已播放时长
      currentLyricIndex: 0, // 当前歌词下标
      playState: false // 播放状态
    }
  },
  getters: {
    getAlbumCover: function (state) {
      if (state.song.id) {
        var albummid = ''
        if (state.song.album) {
          albummid = state.song.album.mid
        } else {
          albummid = state.song.albummid
        }
        return 'https://y.gtimg.cn/music/photo_new/T002R500x500M000' + albummid + '.jpg'
      }
    },
    getPlayMethod: function (state) {
      var icon = ''
      var text = ''
      if (state.playMethod === 0) {
        icon = '&#xe61f;'
        text = '顺序播放'
      } else if (state.playMethod === 1) {
        icon = '&#xe61e;'
        text = '单曲循环'
      } else if (state.playMethod === 2) {
        icon = '&#xe612;'
        text = '随机播放'
      }
      return { icon, text }
    }
  },
  mutations,
  actions
})

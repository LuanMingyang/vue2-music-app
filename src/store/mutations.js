import Vue from 'vue'
import API from '../config/api'
import Base64 from '../utils/base64'

const STATE_INIT = 'STATE_INIT' // 初始化
const PLAYER_INIT = 'PLAYER_INIT' // 播放器初始化
const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST' // 更新播放列表
const CHANGE_AND_PLAY = 'CHANGE_AND_PLAY' // 切换歌曲播放并添加到播放列表
const PLAY = 'PLAY' // 切换播放状态
const UPDATE_PLAYINGTIME = 'UPDATE_PLAYINGTIME' // 更新已播放时长
const UPDATE_LYRICINDEX = 'UPDATE_LYRICINDEX' // 更新当前歌词下标
const SET_PLAYERSHOW = 'SET_PLAYERSHOW' // 设置播放器的隐藏与显示
const SET_DURATION = 'SET_DURATION' // 设置当前歌曲总时长
const CHANGE_PLAY_METHOD = 'CHANGE_PLAY_METHOD' // 切换播放方式
const SET_PLAYLISTSHOW = 'SET_PLAYLISTSHOW' // 设置播放列表的隐藏与显示
const SET_SONGLIKED = 'SET_SONGLIKED' // 标记/取消标记歌曲为“我喜欢”

export default {
  // 初始化
  [STATE_INIT]: function (state) {
    state.playerShow = false // 不显示播放器
    state.playlistShow = false // 不显示播放列表
    if (localStorage.likedSongs) {
      state.likedSongs = JSON.parse(localStorage.likedSongs) // 获取被标记为“我喜欢”的歌曲
    }
  },
  [PLAYER_INIT] (state) {
    state.song = {
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
    }
    state.songIndex = null // 当前歌曲在播放列表中的下标
    state.duration = 0 // 当前歌曲的总时长
    state.playingTime = 0 // 当前歌曲已播放时长
    state.currentLyricIndex = 0 // 当前歌词下标
    state.playState = false // 播放状态
  },
  // 更新播放列表
  [UPDATE_PLAYLIST] (state, list) {
    list = list.map(function (song) {
      if (song.musicData) {
        song = song.musicData
      } else if (song.data) {
        song = song.data
      }
      return song
    })
    state.playlist = list
  },
  // 切换歌曲
  [CHANGE_AND_PLAY]: function (state, { song, index }) {
    song.id = song.id || song.songid
    // 如果没有歌词
    if (!song.lyric || song.lyric === '') {
      // 搜索歌词
      Vue.http.jsonp(API.URL_SONG_LYR + song.id,
        {
          async: false,
          jsonp: 'callback'
        }
      ).then((response) => {
        // console.log(Base64.decode(response.data.lyric))

        var lyricArr = [] // 用于存储歌词
        var timeArr = [] // 用于存储时间
        var re = /\[([0-9:\.]{8})\]/gm
        Base64.decode(response.data.lyric).split(re).slice(1).forEach((value, index) => {
          if (index % 2 === 0) {
            timeArr.push(value)
          } else {
            lyricArr.push(value)
          }
        })

        // 将时间转换成毫秒，如：00:00.28 => 280, 00:01:10 => 1100
        for (var i = 0; i < timeArr.length; i++) {
          var minutes = parseInt(timeArr[i].split(':')[0])
          var seconds = parseInt(timeArr[i].split(':')[1].split('.')[0])
          var millisecond = parseInt(timeArr[i].split(':')[1].split('.')[1]) * 10
          timeArr[i] = minutes * 60 * 1000 + seconds * 1000 + millisecond
        }

        // timeArr.map(time => {
        //   var minutes = parseInt(time.split(':')[0])
        //   var seconds = parseInt(time.split(':')[1].split('.')[0])
        //   var bseconds = parseInt(time.split(':')[1].split('.')[1]) * 10
        //   return minutes * 60 * 1000 + seconds * 1000 + bseconds
        // })

        song.lyric = {
          lyric: Base64.decode(response.data.lyric),
          lyricArr,
          timeArr
        }
      }).catch(function (response) {
        console.log(response)
      })
    }
    state.song = song
    // state.playlist.push(song)
    state.songIndex = index
    state.playingTime = 0
    state.currentLyricIndex = 0
    state.playState = true
  },
  // 切换播放状态
  [PLAY]: function (state) {
    state.playState = !state.playState
  },
  // 更新已播放时长
  [UPDATE_PLAYINGTIME]: function (state, time) {
    state.playingTime = time
  },
  // 更新当前歌词下标
  [UPDATE_LYRICINDEX]: function (state) {
    state.currentLyricIndex++
  },
  // 设置播放器的隐藏与显示
  [SET_PLAYERSHOW]: function (state, show) {
    state.playerShow = show
  },
  // 设置当前歌曲总时长
  [SET_DURATION]: function (state, duration) {
    state.duration = duration
  },
  // 切换播放方式
  [CHANGE_PLAY_METHOD]: function (state, method) {
    if (method === 2) {
      method = 0
    } else {
      method++
    }
    state.playMethod = method
  },
  // 设置播放列表的隐藏与显示
  [SET_PLAYLISTSHOW]: function (state, show) {
    state.playlistShow = show
  },
  // 标记/取消标记歌曲为“我喜欢”
  [SET_SONGLIKED]: function (state, song) {
    if (!song.id) {
      song.id = song.songid
    }
    var liked = state.likedSongs.indexOf(song.id) > -1 // 判断是否已标记为“我喜欢”
    if (liked) { // 是则取消标记
      var index = state.likedSongs.indexOf(song.id)
      state.likedSongs.splice(index, 1)
    } else {
      state.likedSongs.push(song.id)
    }
    localStorage.likedSongs = JSON.stringify(state.likedSongs)
  }
}

export default {
  // 状态初始化
  stateInit (context) {
    context.commit('STATE_INIT')
  },
  // 播放器初始化
  playerInit ({ commit }) {
    commit('PLAYER_INIT')
  },
  // 更新播放列表
  updatePlaylist ({ commit }, list) {
    commit('UPDATE_PLAYLIST', list)
  },
  // 设置歌曲并播放
  changeSongPlay ({ commit }, { song, index }) {
    commit('CHANGE_AND_PLAY', { song, index })
  },
  // 播放(暂停播放)歌曲
  play: function ({ commit }) {
    commit('PLAY')
  },
  // 更新已播放时长
  updatePlayingTime ({ commit }, time) {
    commit('UPDATE_PLAYINGTIME', time)
  },
  // 更新当前歌词下标
  updateLyricIndex ({ commit }) {
    commit('UPDATE_LYRICINDEX')
  },
  // 设置播放器的隐藏与显示
  setPlayerShow ({ commit }, show) {
    commit('SET_PLAYERSHOW', show)
  },
  // 设置当前歌曲总时长
  setDuration ({ commit }, duration) {
    commit('SET_DURATION', duration)
  },
  // 切换播放方式
  changePlayMethod ({ commit }, method) {
    commit('CHANGE_PLAY_METHOD', method)
  },
  // 设置播放列表的隐藏与显示
  setPlaylistShow ({ commit }, show) {
    commit('SET_PLAYLISTSHOW', show)
  },
  // 标记/取消标记歌曲为“我喜欢”
  setSongLiked ({ commit }, song) {
    commit('SET_SONGLIKED', song)
  }
}

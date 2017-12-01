const COMMON_PARAMS = 'g_tk=5381&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0'
const COMMON_PARAMS_H5 = 'g_tk=5381&uin=0&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=0&format=jsonp'
const C_Y_QQ_COM = 'https://c.y.qq.com'

/* 搜索 */
// 热门搜索关键字
const URL_HOT_KEY = `${C_Y_QQ_COM}/splcloud/fcgi-bin/gethotkey.fcg?&format=jsonp${COMMON_PARAMS}`
// 搜索结果-单曲
const URL_SEARCH_CLIENT_SONG = `${C_Y_QQ_COM}/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&format=jsonp&${COMMON_PARAMS}`
// 搜索结果-mv
const URL_SEARCH_CLIENT_MV = `${C_Y_QQ_COM}/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&remoteplace=txt.yqq.mv&aggr=0&catZhida=1&lossless=0&sem=1&t=12&format=jsonp&${COMMON_PARAMS}`
// 搜素专辑
const URL_SEARCH_CLIENT_ALBUM = `${C_Y_QQ_COM}/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&remoteplace=txt.yqq.album&aggr=0&catZhida=1&lossless=0&sem=10&t=8&format=jsonp&${COMMON_PARAMS}`
// 搜索后的智能搜索
const URL_SEARCH_SMARTBOX = `${C_Y_QQ_COM}/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&format=jsonp&${COMMON_PARAMS}`
// 搜索后歌单搜素
const URL_SEARCH_CLIENT_DISS = `${C_Y_QQ_COM}//soso/fcgi-bin/client_music_search_songlist?flag_qc=0&format=jsonp&${COMMON_PARAMS}`

/* 排行 */
// 排行榜分类
// const URL_TOPLIST_OPT = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_v8_toplist_opt.fcg?page=index&format=html&tpl=macv4&v8debug=1`
const URL_TOPLIST_OPT = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_myqq_toplist.fcg?${COMMON_PARAMS_H5}`
// 某个排行的列表
const URL_TOPLIST_LIST = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&type=top&format=jsonp&${COMMON_PARAMS}`

// 首页推荐
const URL_RRCOM = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_first_yqq.fcg?tpl=v12&page=other&format=jsonp&${COMMON_PARAMS}`

/* 歌曲 */
// 歌曲歌词
// const URL_SONG_LYR = `${C_Y_QQ_COM}/lyric/fcgi-bin/fcg_query_lyric_new.fcg?${COMMON_PARAMS}`
const URL_SONG_LYR = 'https://api.darlin.me/music/lyric/'

/* 歌手 */
// 搜索歌手
const URL_SEARCH_SINGER = `${C_Y_QQ_COM}/v8/fcg-bin/v8.fcg?channel=singer&page=list&format=jsonp&${COMMON_PARAMS}`
// 相似歌手
const URL_SINGER_SIM = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_v8_simsinger.fcg?utf8=1&format=jsonp&${COMMON_PARAMS}`
// 歌手的歌曲
const URL_SINGER_SONGS = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?order=listen&songstatus=1&format=jsonp&${COMMON_PARAMS}`
// 获得歌手的推荐歌曲和3个专辑
const URL_SINGER_TRACK = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?order=listen&platform=h5page&from=h5&format=jsonp&${COMMON_PARAMS}`
// 歌手的专辑
const URL_SINGER_ALBUM = `${C_Y_QQ_COM}/v8/fcg-bin/fcg_v8_singer_album.fcg?order=time&format=jsonp&${COMMON_PARAMS}`
// 歌手描述
const URL_SINGER_DESC = `${C_Y_QQ_COM}/splcloud/fcgi-bin/fcg_get_singer_desc.fcg?utf8=1&outCharset=utf-8&format=xml`
// 歌手的粉丝
const URL_SINGER_FANS = `${C_Y_QQ_COM}/rsc/fcgi-bin/fcg_order_singer_getnum.fcg?utf8=1&format=jsonp&${COMMON_PARAMS}`
// 歌手的MV
const URL_SINGER_MVS = `${C_Y_QQ_COM}/mv/fcgi-bin/fcg_singer_mv.fcg?cid=205360581&format=jsonp&${COMMON_PARAMS}`

export default {
  URL_HOT_KEY,
  URL_SEARCH_CLIENT_SONG,
  URL_SEARCH_CLIENT_MV,
  URL_SEARCH_CLIENT_ALBUM,
  URL_SEARCH_SMARTBOX,
  URL_TOPLIST_OPT,
  URL_TOPLIST_LIST,
  URL_SEARCH_CLIENT_DISS,
  URL_RRCOM,
  URL_SONG_LYR,
  URL_SEARCH_SINGER,
  URL_SINGER_SIM,
  URL_SINGER_SONGS,
  URL_SINGER_TRACK,
  URL_SINGER_ALBUM,
  URL_SINGER_MVS,
  URL_SINGER_DESC,
  URL_SINGER_FANS
}

import http from './http'

export default {

  // 登录
  requestLogin: params => {
    return http.get(`/login`, params).then(res => res.data)
  },

  // 注销
  requestLogout: () => {
    return http.delete(`/logout`).then(res => res.data)
  },

  // 列表
  reqRoundInfoSummary: params => {
    return http.get(`/round-info/summary`, params).then(res => res.data)
  },
  // 详细
  reqRoundInfoDetail: params => {
    return http.get(`/round-info/detail`, params).then(res => res.data)
  },
  reqGetDiskOption: params => {
    return http.get(`/filedisk/option`, params).then(res => res.data)
  }

}

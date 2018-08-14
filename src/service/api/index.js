export default {
  api: [{
    name: 'sug',
    method: 'GET',
    desc: '搜索接口',
    path: '/api/sug',
    params: {
      q: '北京',
      extras: 1,
      code: 'utf-8'
    }
  },
  {
    name: 'recommend.action',
    method: 'GET',
    desc: '猜你喜欢',
    path: '/jdapi/index/recommend.action',
    params: {
      page: 1,
      _format_: 'json'
    }
  }]
}

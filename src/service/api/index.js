export default {
  api: [{
    name: 'search',
    method: 'GET',
    desc: '搜索接口',
    path: '/api/sug',
    params: {
      q: '北京',
      extras: 1,
      code: 'utf-8'
    }
  }]
}

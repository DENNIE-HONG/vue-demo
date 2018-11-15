import axios from '../../plugins/axios';
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
  }],
  kaola: [{
    name: 'cart',
    method: 'GET',
    desc: '',
    path: '/kaola/cart/cartdata.html',
    params: {}
  }]
}

export const getSugguest = (keyword) => {
  const params = {
    q: keyword,
    extras: 1,
    code: 'utf-8'
  };
  return axios({
    method: 'GET',
    url: '/api/sug',
    params
  });
}

export const getCart = (params) => axios({
  method: 'GET',
  url: '/kaola/cart/cartdata.html',
  params
});

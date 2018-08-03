/**
 * 用户数据相关接口api
 * @author luyanhong 2018-08-03
*/
import Cookie from 'universal-cookie';
const cookies = new Cookie();
const required = () => {
  throw Error('missing parameter');
}
const userName = 'name';
const defaultName = 'vue宝宝';
import defaultAvatar from 'assets/img/user.png';
// 登入
export function postLogin (params = required()) {
  return new Promise((resolve, reject) => {
    if (!params.name) {
      reject({
        code: 1,
        msg: '缺少参数name'
      });
    }
    cookies.set(userName, params.name, {
      path: '/'
    });
    resolve({
      code: 200,
      msg: ''
    });
  })
}

// 用户信息
export function getUser () {
  const data = {
    avatar: defaultAvatar,
    name: defaultName,
    isLogin: false
  };
  const name = cookies.get(userName);
  if (name) {
    Object.assign(data, {
      name,
      isLogin: true
    });
  }
  return Promise.resolve({
    code: 200,
    data,
    msg: ''
  });
}

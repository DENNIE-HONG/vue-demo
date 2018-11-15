/**
 * 用户数据相关接口api
 * @author luyanhong 2018-08-03
*/
import Cookie from 'universal-cookie';
import jwt from 'jsonwebtoken';
const cookies = new Cookie();
import xss from 'xss';
const required = () => {
  throw Error('missing parameter');
}
const userName = 'name';
const defaultName = 'vue宝宝';
const vueToken = 'vue_token';
import defaultAvatar from 'assets/img/user.png';
const storeToken = (data) => {
  const token = jwt.sign(data, 'secret', { expiresIn: '3 days' });
  cookies.set(vueToken, token);
}
/**
 * 登入接口
 * @param {Object} {name: 'xxx', password: 'xx'}
 */
export function postLogin (params = required()) {
  return new Promise((resolve, reject) => {
    const { name } = params;
    if (!name) {
      reject({
        code: 1,
        msg: '缺少参数name'
      });
    }
    const originName = localStorage.getItem(userName);
    if (name === originName) {
      storeToken({ name });
      resolve({
        code: 200,
        msg: ''
      });
    } else {
      reject({
        code: 1,
        msg: '找不到该用户哦'
      });
    }
  })
}

// 用户信息
export function getUser () {
  const data = {
    name: defaultName,
    avatar: defaultAvatar,
    isLogin: false
  };
  const token = cookies.get(vueToken);
  let deCoded;
  if (token) {
    jwt.verify(token, 'secret', function (err, decoded) {
      if (err) {
        return;
      }
      deCoded = decoded;
    });
  }
  if (deCoded && deCoded[userName]) {
    const name = deCoded[userName];
    const avatar = localStorage.getItem('avatar');
    Object.assign(data, {
      name,
      avatar: avatar || defaultAvatar,
      isLogin: true
    });
  }
  return Promise.resolve({
    code: 200,
    data,
    msg: ''
  });
}

// 退出
export function signOut () {
  const token = cookies.get(vueToken);
  return new Promise((resolve, reject) => {
    if (token) {
      cookies.remove(vueToken);
      resolve({
        code: 200,
        msg: ''
      });
    } else {
      reject({
        code: 1,
        msg: '您还没有登入哦'
      });
    }
  });
}

/**
 * 注册用户
 * @param {Object} { name: 'xxx' }, 用户昵称
*/
export function signUp ({ name }) {
  return new Promise((resolve, reject) => {
    if (!name) {
      reject({
        code: 1,
        msg: '缺少参数name'
      });
    }
    storeToken({ name });
    // 永久保存昵称
    localStorage.setItem(userName, name);
    resolve({
      code: 200,
      msg: ''
    });
  });
}

/**
 * 修改用户信息
*/
export function modifyUser ({ name, avatar }) {
  return new Promise((resolve, reject) => {
    const changeName = xss(name);
    const changeAvatar = xss(avatar);
    if (!changeName && !changeAvatar) {
      reject({
        code: 1,
        msg: '参数不为空！'
      });
    }
    changeName && localStorage.setItem(userName, changeName);
    changeAvatar && localStorage.setItem('avatar', changeAvatar);
    storeToken({ name: changeName });
    resolve({
      code: 200,
      msg: ''
    });
  })
}

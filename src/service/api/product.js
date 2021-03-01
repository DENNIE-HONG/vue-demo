import jsonp from 'jsonp';
import querystring from 'querystring';
const GET_GUESS_URL = '/jdapi/mcoss/reclike/getrecinfo';
const GET_QUESTION_URL = '/jdapi/questionanswer/GetSkuQuestionListWeChat';
const GET_SPECIFICATION_URL = '/jdapi/commodity/itembranch/getspecification';
const required = () => {
  throw Error('missing parameter！');
}
export const getQuestion = (productId = required()) => {
  const params = {
    productId
  };
  const q = querystring.encode(params);
  return new Promise((resolve, reject) => {
    jsonp(`${GET_QUESTION_URL}?${q}`, { timeout: 10000 }, (err, res) => {
      if (err) {
        reject('网络不给力，请稍后再试');
      }
      resolve(res);
    })
  });
}
export const getGuess = (productId = required()) => {
  const params = {
    sku: productId,
    pc: 30
  };
  const q = querystring.encode(params);
  return new Promise((resolve, reject) => {
    jsonp(`${GET_GUESS_URL}?${q}`, { timeout: 10000 }, (err, res) => {
      if (err) {
        reject('网络不给力，请稍后再试');
      }
      resolve(res);
    })
  });
}
export const getSpecification = (productId = required()) => {
  const params = {
    skuid: productId
  };
  const q = querystring.encode(params);
  return new Promise((resolve, reject) => {
    jsonp(`${GET_SPECIFICATION_URL}?${q}`, { timeout: 10000 }, (err, res) => {
      if (err) {
        reject('网络不给力，请稍后再试');
      }
      resolve(res);
    })
  });
}

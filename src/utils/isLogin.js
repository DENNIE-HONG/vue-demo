import Cookie from 'universal-cookie';
const cookies = new Cookie();
const token = 'vue_token';
const isLogin = () => cookies.get(token);
export default isLogin;

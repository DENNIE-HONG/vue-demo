/**
 * 路由配置
 * @author luyanhong 2018-07-26
*/
const Home = () => import(/* webpackChunkName:"home" */ 'views/home/index.vue');
const My = () => import(/* webpackChunkName:"my" */ 'views/my/index.vue');
const Login = () => import(/* webpackChunkName: "login" */ 'views/login/index.vue');
const Setting = () => import(/* webpackChunkName:"setting" */ 'views/setting/index.vue');
import Search from 'views/search/index.vue';
// const Search = () => import(/* webpackChunkName: "setting" */ 'views/search/index.vue');
const NotFound = () => import(/* webpackChunkName: "404" */ 'views/404/');
const Product = () => import(/* webpackChunkName: "product" */ 'views/product/');
const Question = () => import(/* webpackChunkName: "question" */ 'views/question/');
const QuestionDetail = () => import(/* webpackChunkName: "question-detail" */ 'views/question-detail/');
const Cart = () => import(/* webpackChunkName: "cart" */ 'views/cart/');
const routes = [
  { path: '/', component: Home },
  { path: '/my', component: My },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/setting',
    component: Setting,
    meta: { requiresAuth: true }
  },
  { path: '/product/:productId', component: Product },
  { path: '/question/:productId', component: Question },
  { path: '/question/:productId/detail/:id', component: QuestionDetail },
  { path: '/cart', component: Cart },
  { path: '*', component: NotFound }
];
export default routes;

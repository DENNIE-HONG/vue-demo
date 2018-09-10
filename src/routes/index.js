/**
 * 路由配置
 * @author luyanhong 2018-07-26
*/
import Home from 'views/home/index.vue';
import My from 'views/my/index.vue';
import Login from 'views/login/index.vue';
import Setting from 'views/setting/index.vue';
import Search from 'views/search/index.vue';
import NotFound from 'views/404/index.vue';
import Product from 'views/product/index.vue';
import Question from 'views/question';
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
  { path: '*', component: NotFound }
];
export default routes;

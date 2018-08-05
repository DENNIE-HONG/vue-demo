/**
 * 路由配置
 * @author luyanhong 2018-07-26
*/
import Home from 'views/home/index.vue';
import My from 'views/my/index.vue';
import Login from 'views/login/index.vue';
import Setting from 'views/setting/index.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/my', component: My },
  { path: '/login', component: Login },
  { path: '/setting',
    component: Setting,
    meta: { requiresAuth: true }
  }
];
export default routes;

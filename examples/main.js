/**
 * Created by justfine on 18/1/24
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';

// 完整引入 Zant
import Zant from '../src/index';
// import locale from '../src/locale/lang/en-US';
import locale from '../src/locale/lang/zh-CN';

Vue.use(Zant, { locale });

Vue.use(VueRouter);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
  esModule: false,
  routes: [{
    path: '/affix',
    component: (resolve) => require(['./routers/affix.vue'], resolve)
  }, {
    path: '/button',
    component: (resolve) => require(['./routers/button.vue'], resolve)
  }, {
    path: '/grid',
    component: (resolve) => require(['./routers/grid.vue'], resolve)
  }, {
    path: '/icon',
    component: (resolve) => require(['./routers/icon.vue'], resolve)
  }]
});

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import { Header, Main, Footer } from '../src/components/layout';
import Input from '../src/components/input';

Vue.component(Header.name, Header);
Vue.component(Main.name, Main);
Vue.component(Footer.name, Footer);
Vue.component(Input.name, Input);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

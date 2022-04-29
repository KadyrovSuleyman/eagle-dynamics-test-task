import Vue from 'vue';
import App from './components/App.vue';
import store from './store';

import './sass/index.scss';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

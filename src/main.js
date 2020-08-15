import Vue from 'vue';
import App from './App.vue';

import store from "./store/store.js";


// bootstrap for development
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


Vue.config.productionTip = false
Vue.config.devtools = true;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');

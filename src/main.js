import 'font-awesome/css/font-awesome.css';
import 'cryptocoins-icons/webfont/cryptocoins.css';
import 'cryptocoins-icons/webfont/cryptocoins-colors.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './pages/App.vue';
import Home from './pages/Home.vue';

import Error404 from './pages/404.vue';
import Donate from './pages/Donate.vue';
import About from './pages/About.vue';
import SmallChart from './charts/SmallChart.vue';
// import './assets/css/style.css';
import './assets/scss/main.scss';

import Config from './config/Config';
import BootstrapVue from 'bootstrap-vue';

//import Coincap from './Coincap';

import store from './store';
Vue.use(BootstrapVue);

Vue.use(VueRouter);
Vue.component('small-chart', SmallChart);
import { currencyFilter } from './filters/currency';
import {currencyGlobalFilter} from './filters/currency_global';
Vue.filter('currencyFilter', currencyFilter);
Vue.filter('currencyGlobalFilter', currencyGlobalFilter);


// Socket io isntance
import VueSocketIO from 'vue-socket.io';
import io from 'socket.io-client';
const SocketInstance = io('http://socket.coincap.io');

Vue.use(VueSocketIO, SocketInstance,store);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home, alias: '/home'},
    { path: '/donate', component: Donate },
    { path: '/about-us', component: About },
    { path: '*', component: Error404 },
  ],
  linkActiveClass: "active" // active link navbar
});

const vm = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});

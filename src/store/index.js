import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import * as actions from './actions';
import { mutations } from './mutations';
import { state } from './state';
import coincap from './modules/coincap';
import fixer_io from './modules/fixer_io';
import socketCoincap from './modules/socketCoincap';
Vue.use(Vuex);
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    coincap,
    fixer_io,
    socketCoincap,
  },
});


/*
if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}*/

export default store;

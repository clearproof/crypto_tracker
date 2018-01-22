import * as types from '../mutation-types';

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// initial state
const state = {
  connect: false,
  trades: null,
};

// getters
const getters = {
  isConnected: state => state.connect,
  trades: state => state.trades,
};

// actions
const actions = {
  socket_trades: (context, trades) => {
    context.dispatch('newTrades', trades);
    //context.commit('NEW_TRADES_RECEIVED', trades);
  },
};

// mutations
const mutations = {
  [types.SOCKET_CONNECT]: (state,  status ) => {
    state.connect = true;
  },

  [types.SOCKET_TRADES]: (state,  trades) => {
    state.trades = trades;
  },

};

export default {
  state,
  getters,
  actions,
  mutations
};
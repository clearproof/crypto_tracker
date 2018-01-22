import Coincap from '../../api/Coincap';
import * as types from '../mutation-types'

// initial state
const state = {
  coins: [],
  fetchFrontStatus: false,
  fetchFrontErr: null,
  global: [],
  fetchGlobalStatus: false,
  fetchGlobalErr: null,
};

// getters
const getters = {
  fetchFrontStatus: state => state.fetchFrontStatus,
  fetchGlobalStatus: state => state.fetchGlobalStatus,
  global: state => state.global,
  coins: state => state.coins,
  frontErr: state => state.fetchFrontErr,
  globalErr: state => state.fetchGlobalErr
};

// actions
const actions = {
  fetchFront ({ commit }) {
    const savedCoins = [...state.coins];
    commit(types.FETCH_COINS_REQUEST);
    Coincap.getCoins(
      (coins) => {
        commit(types.RECEIVE_COINS, { coins });
        commit(types.FETCH_COINS_SUCCESS);
      },
      (err) => commit(types.FETCH_COINS_FAILURE, { savedCoins,err })
    );
  },
  fetchGlobal ({ commit }) {
    const savedGlobal = [...state.global];
    commit(types.FETCH_GLOBAL_REQUEST);
    Coincap.getGlobal(
      (global) => {
        commit(types.RECEIVE_GLOBAL, { global });
        commit(types.FETCH_GLOBAL_SUCCESS);
      },
      (err) => commit(types.FETCH_GLOBAL_FAILURE, { savedGlobal,err })
    );
  },

  // Action from socket
  newTrades({ commit },trades) {
    commit(types.NEW_COIN_VALUE, {trades});
    //console.log(trades.message);
  },
};

// mutations
const mutations = {
  /** Front coins **/
  [types.RECEIVE_COINS] (state, { coins }) {
    state.coins = coins
  },

  [types.FETCH_COINS_REQUEST] (state) {
    state.coins = [];
    state.fetchFrontErr = null;
    state.fetchFrontStatus = false;
  },

  [types.FETCH_COINS_SUCCESS] (state) {
    state.fetchFrontStatus = true;
  },

  [types.FETCH_COINS_FAILURE] (state, { savedCoins, err }) {
    state.coins = savedCoins;
    state.fetchFrontErr = err;
    state.fetchFrontStatus = false;
  },

  /** Global coins **/
  [types.RECEIVE_GLOBAL] (state, { global }) {
    state.global = global
  },

  [types.FETCH_GLOBAL_REQUEST] (state) {
    // clear cart
    state.global = [];
    state.fetchGlobalErr = null;
    state.fetchGlobalStatus = false;
  },

  [types.FETCH_GLOBAL_SUCCESS] (state) {
    state.fetchGlobalStatus = true;
  },

  [types.FETCH_GLOBAL_FAILURE] (state, { savedGlobal, err }) {
    state.global = savedGlobal;
    state.fetchGlobalErr = err;
    state.fetchGlobalStatus = false;
  },

  /* Socket mutaiton */

  [types.NEW_COIN_VALUE] (state, { trades }) {
    //console.log(trades);
    let savedCoins = state.coins;
    for(let e in savedCoins){
      if(savedCoins[e].short === trades.message.coin){
        savedCoins[e].mktcap = trades.message.msg.mktcap;
        savedCoins[e].price = trades.message.msg.price;
        savedCoins[e].perc = trades.message.msg.perc;
        savedCoins[e].volume = trades.message.msg.volume;
        savedCoins[e].volume = trades.message.msg.volume;
        savedCoins[e]._rowVariant = "success";
        //break;
      }else{
        savedCoins[e]._rowVariant = null;
      }
    }
    state.coins = savedCoins;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
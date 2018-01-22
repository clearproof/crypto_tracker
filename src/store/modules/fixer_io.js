import FixerIO from '../../api/Fixer_io';
import * as types from '../mutation-types';

// initial state
const state = {
  rates: [],
  fetchLatest: false,
  fetchLatestErr: null,
};

// getters
const getters = {
  fetchLatest: state => state.fetchLatest,
  rates: state => state.rates,
};

// actions
const actions = {
  fetchLatest ({ commit }) {
    const savedRates = [...state.rates];
    commit(types.FETCH_LATEST_CHANGE_REQUEST);
    FixerIO.getLatestChange(
      (rates) => {
        commit(types.RECEIVE_LATEST_CHANGE, { rates });
        commit(types.FETCH_LATEST_CHANGE_SUCCESS);
      },
      (err) => commit(types.FETCH_LATEST_CHANGE_FAILURE, { savedRates,err })
    );
  },
};

// mutations
const mutations = {
  /** Latest change **/
  [types.RECEIVE_LATEST_CHANGE] (state, { rates }) {
    state.rates = rates
  },

  [types.FETCH_LATEST_CHANGE_REQUEST] (state) {
    state.rates = [];
    state.fetchLatestErr = null;
    state.fetchLatest = false;
  },

  [types.FETCH_LATEST_CHANGE_SUCCESS] (state) {
    state.fetchLatest = true;
  },

  [types.FETCH_LATEST_CHANGE_FAILURE] (state, { savedRates, err }) {
    state.rates = savedRates;
    state.fetchLatestErr = err;
    state.fetchLatest = false;
  },

};

export default {
  state,
  getters,
  actions,
  mutations
}
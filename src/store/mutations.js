import * as types from './mutation-types';

// mutations
export const mutations = {
  [types.SET_CURRENCY] (state, { currency }) {
    state.currency = currency
  },
};

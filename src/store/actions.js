import * as types from './mutation-types'

export const setCurrency = ({ commit }, currency) => {

  if(['EUR','USD'].includes(currency)){
    commit(types.SET_CURRENCY, {
      currency: currency
    })
  }

};
import * as types from '../constants/ActionTypes'

export const receiveBills = bills => ({
  type: types.RECEIVE_BILLS,
  bills,
})

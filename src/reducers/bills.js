import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  byId: {},
  allIds: [],
}

function bills(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_BILL:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.bill._id]: {
            ...action.bill,
          }
        },
        allIds: state.allIds.concat([action.bill._id])
      }
    default:
      return state
  }
}

export default bills

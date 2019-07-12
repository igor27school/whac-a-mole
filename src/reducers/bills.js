import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  byId: {},
  allIds: [],
}

function bills(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_BILLS:
      return action.bills.reduce((state, bill) => {
        return {
          ...state,
          byId: {
            ...state.byId,
            [bill._id]: {
              ...state.byId[bill._id],
              ...bill,
            }
          },
          allIds: state.allIds.concat([bill._id])
        }
      },
      state)
    case ActionTypes.RECEIVE_BILL:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.bill._id]: {
            ...state.byId[action.bill._id],
            ...action.bill,
          }
        },
      }
    case ActionTypes.RECEIVE_TALLIES_FOR_BILL:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.billId]: {
            ...state.byId[action.billId],
            tallies: action.tallies.map(tally => tally._id),
          },
        },
      }
    default:
      return state
  }
}

export default bills

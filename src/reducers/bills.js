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
              ...bill,
            }
          },
          allIds: state.allIds.concat([bill._id])
        }
      },
      initialState,
    )
    case ActionTypes.RECEIVE_VOTES_FOR_BILL:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.billId]: {
            ...state.byId[action.billId],
            votes: action.votes.map(vote => vote._id),
          },
        },
      }
    default:
      return state
  }
}

export default bills

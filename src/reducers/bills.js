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
            [bill.id]: {
              ...bill,
            }
          },
          allIds: state.allIds.concat([bill.id])
        }
      },
      initialState,
    )
    default:
      return state
  }
}

export default bills

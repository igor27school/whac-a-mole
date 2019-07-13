import * as ActionTypes from '../constants/ActionTypes'
import { constructTalliesComparisonKey } from '../utils/Utils'

const initialState = {
  byId: {},
}

function oppositeVotes(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_OPPOSITE_VOTES:
      const compKey = constructTalliesComparisonKey(action.firstTallyId, action.secondTallyId)
      return {
        ...state,
        byId: {
          ...state.byId,
          [compKey]: action.oppositeVotes,
        },
      }
    default:
      return state
  }
}

export default oppositeVotes

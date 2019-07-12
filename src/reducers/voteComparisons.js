import * as ActionTypes from '../constants/ActionTypes'
import { constructVoteComparisonKey } from '../utils/Utils'

const initialState = {
  byId: {},
  allIds: [],
}

function voteComparisons(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_VOTE_PAIRS:
      const compKey = constructVoteComparisonKey(action.firstSenatorId, action.secondSenatorId)
      return {
        ...state,
        byId: {
          ...state.byId,
          [compKey]: action.votePairs,
        },
      }
    default:
      return state
  }
}

export default voteComparisons

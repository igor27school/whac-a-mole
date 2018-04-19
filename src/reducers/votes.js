import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  byId: {},
  allIds: [],
}

function votes(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_VOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.vote.id]: {
            ...action.vote,
          }
        },
        allIds: state.allIds.concat([action.vote.id])
      }
    case ActionTypes.RECEIVE_VOTES_FOR_BILL:
    case ActionTypes.RECEIVE_VOTES_FOR_SENATOR:
      return action.votes.reduce((state, vote) => {
        return {
          ...state,
          byId: {
            ...state.byId,
            [vote.id]: {
              ...vote,
            }
          },
          allIds: state.allIds.concat([vote.id])
        }
      },
      initialState,
    )
    default:
      return state
  }
}

export default votes

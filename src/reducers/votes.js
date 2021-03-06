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
          [action.vote._id]: {
            ...action.vote,
          }
        },
      }
    case ActionTypes.RECEIVE_USER_MARKS_FOR_VOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.voteId]: {
            ...state.byId[action.voteId],
            upMarks: action.upMarks.map(userMark => userMark._id),
            downMarks: action.downMarks.map(userMark => userMark._id),
          },
        },
      }
    case ActionTypes.RECEIVE_VOTES_FOR_TALLY:
    case ActionTypes.RECEIVE_VOTES_FOR_SENATOR:
      return action.votes.reduce((state, vote) => {
        return {
          ...state,
          byId: {
            ...state.byId,
            [vote._id]: {
              ...state.byId[vote._id],
              ...vote,
            }
          },
        }
      },
      state)
    default:
      return state
  }
}

export default votes

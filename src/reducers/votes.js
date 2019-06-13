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
        allIds: state.allIds.concat([action.vote._id])
      }
    case ActionTypes.RECEIVE_USER_VOTES_FOR_VOTE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.voteId]: {
            ...state.byId[action.voteId],
            upVotes: action.upVotes.map(userVote => userVote._id),
            downVotes: action.downVotes.map(userVote => userVote._id),
          },
        },
      }
    case ActionTypes.RECEIVE_VOTES_FOR_BILL:
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
          allIds: state.allIds.concat([vote._id])
        }
      },
      state)
    default:
      return state
  }
}

export default votes

import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  byId: {},
  allIds: [],
}

function senators(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_SENATORS:
      return action.senators.reduce((state, senator) => {
        return {
          ...state,
          byId: {
            ...state.byId,
            [senator._id]: {
              ...state.byId[senator._id],
              ...senator,
            }
          },
          allIds: state.allIds.concat([senator._id])
        }
      },
      state,
    )
    case ActionTypes.RECEIVE_VOTES_FOR_SENATOR:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.senatorId]: {
            ...state.byId[action.senatorId],
            votes: action.votes.map(vote => vote._id),
          },
        },
      }
    default:
      return state
  }
}

export default senators

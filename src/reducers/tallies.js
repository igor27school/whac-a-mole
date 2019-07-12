import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  byId: {},
  allIds: [],
}

function tallies(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_TALLIES:
      return action.tallies.reduce((state, tally) => {
        return {
          ...state,
          byId: {
            ...state.byId,
            [tally._id]: {
              ...state.byId[tally._id],
              ...tally,
            }
          },
          allIds: state.allIds.concat([tally._id])
        }
      },
      state)
    case ActionTypes.RECEIVE_VOTES_FOR_TALLY:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.tallyId]: {
            ...state.byId[action.tallyId],
            votes: action.votes.map(vote => vote._id),
          },
        },
      }
    case ActionTypes.RECEIVE_TALLIES_FOR_BILL:
      return action.tallies.reduce((state, tally) => {
        return {
          ...state,
          byId: {
            ...state.byId,
            [tally._id]: {
              ...state.byId[tally._id],
              ...tally,
            }
          },
          allIds: state.allIds.concat([tally._id])
        }
      },
      state)
    default:
      return state
  }
}

export default tallies

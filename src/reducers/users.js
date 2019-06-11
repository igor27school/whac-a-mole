import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
  byId: {},
  allIds: [],
}

function users(state=initialState, action) {
  switch(action.type) {
    case ActionTypes.RECEIVE_USER:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.user._id]: {
            ...action.user,
          }
        },
        allIds: state.allIds.concat([action.user._id])
      }
    case ActionTypes.RECEIVE_USERS:
      return action.users.reduce((state, user) => {
        return {
          ...state,
          byId: {
            ...state.byId,
            [user._id]: {
              ...state.byId[user._id],
              ...user,
            }
          },
          allIds: state.allIds.concat([user._id])
        }
      },
      state)
    default:
      return state
  }
}

export default users

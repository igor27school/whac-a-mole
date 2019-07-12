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
      }
    case ActionTypes.RECEIVE_MARKS_FOR_USER:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.userId]: {
            ...state.byId[action.userId],
            upMarks: action.upMarks.map(userMarks => userMarks.vote),
            downMarks: action.downMarks.map(userMarks => userMarks.vote),
          },
        },
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

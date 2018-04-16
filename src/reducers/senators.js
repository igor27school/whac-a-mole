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
            [senator.id]: {
              ...senator,
            }
          },
          allIds: state.allIds.concat([senator.id])
        }
      },
      initialState,
    )
    default:
      return state
  }
}

export default senators

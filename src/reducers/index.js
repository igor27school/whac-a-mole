import { combineReducers } from 'redux'
import bills from './bills'
import senators from './senators'
import votes from './votes'

export default combineReducers({bills, senators, votes})

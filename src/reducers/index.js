import { combineReducers } from 'redux'
import bills from './bills'
import senators from './senators'
import users from './users'
import votes from './votes'
import voteComparisons from './voteComparisons'

export default combineReducers({bills, senators, users, votes, voteComparisons})

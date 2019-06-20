import { combineReducers } from 'redux'
import bills from './bills'
import tallies from './tallies'
import senators from './senators'
import users from './users'
import votes from './votes'
import voteComparisons from './voteComparisons'

export default combineReducers({bills, tallies, senators, users, votes, voteComparisons})

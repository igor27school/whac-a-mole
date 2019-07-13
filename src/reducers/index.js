import { combineReducers } from 'redux'
import bills from './bills'
import oppositeVotes from './oppositeVotes'
import senators from './senators'
import tallies from './tallies'
import users from './users'
import voteComparisons from './voteComparisons'
import votes from './votes'

export default combineReducers({bills, oppositeVotes, senators, tallies, users, voteComparisons, votes})

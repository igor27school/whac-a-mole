import * as ServerAPI from '../utils/ServerAPI'
import * as Actions from './Actions'

export function fetchBillFromServer(billId) {
  return dispatch => ServerAPI.getBill(billId).then(bill => {
      dispatch(Actions.receiveBill(bill))
      return bill
  }).catch(err => console.error(err))
}

export function fetchBillsFromServer() {
  return dispatch => ServerAPI.getBills().then(bills => {
      dispatch(Actions.receiveBills(bills))
      return bills
  }).catch(err => console.error(err))
}

export function fetchSenatorsWithOppositeVotesFromServer(firstTallyId, secondTallyId) {
  return dispatch => ServerAPI.getOppositeVotes(firstTallyId, secondTallyId).then(oppositeVotes => dispatch(Actions.receiveOppositeVotes(firstTallyId, secondTallyId, oppositeVotes))).catch(err => console.error(err))
}

export function fetchTalliesFromServer() {
  return dispatch => ServerAPI.getTallies().then(tallies => {
      dispatch(Actions.receiveTallies(tallies))
      return tallies
  }).catch(err => console.error(err))
}

export function fetchTalliesForBillFromServer(billId) {
  return dispatch => ServerAPI.getTalliesForBill(billId).then(tallies => {
      dispatch(Actions.receiveTalliesForBill(billId, tallies))
      return tallies
  }).catch(err => console.error(err))
}

/* Separate function for potential performance improvement in the future */
export function fetchTallyFromServer(tallyId) {
  return dispatch => ServerAPI.getTallies().then(tallies => {
      dispatch(Actions.receiveTallies(tallies))
      return tallies
  }).catch(err => console.error(err))
}

export function fetchSenatorsFromServer() {
  return dispatch => ServerAPI.getSenators().then(senators => {
      dispatch(Actions.receiveSenators(senators))
      return senators
  }).catch(err => console.error(err))
}

/* Separate function for potential performance improvement in the future */
export function fetchSenatorFromServer(senatorId) {
  return dispatch => ServerAPI.getSenators().then(senators => {
      dispatch(Actions.receiveSenators(senators))
      return senators
  }).catch(err => console.error(err))
}

export function fetchUserFromServer(userId) {
  return dispatch => ServerAPI.getUser(userId).then(user => {
      dispatch(Actions.receiveUser(user))
      return user
  }).catch(err => console.error(err))
}

export function fetchVotesForTallyFromServer(tallyId) {
  return dispatch => ServerAPI.getVotesForTally(tallyId).then(votes => {
      dispatch(Actions.receiveVotesForTally(tallyId, votes))
      return votes
  }).catch(err => console.error(err))
}

export function fetchVotesForSenatorFromServer(senatorId) {
  return dispatch => ServerAPI.getVotesForSenator(senatorId).then(votes => dispatch(Actions.receiveVotesForSenator(senatorId, votes))).catch(err => console.error(err))
}

export function fetchMarksForUserFromServer(userId) {
  return dispatch => ServerAPI.getMarksForUser(userId).then(bothMarks => dispatch(Actions.receiveMarksForUser(userId, bothMarks[0], bothMarks[1]))).catch(err => console.error(err))
}

export function fetchVoteFromServer(voteId) {
  return dispatch => ServerAPI.getVote(voteId).then(vote => {
    dispatch(Actions.receiveVote(vote))
    return vote
  }).catch(err => console.error(err))
}

export function fetchVotePairsFromServer(firstSenatorId, secondSenatorId) {
  return dispatch => ServerAPI.getVotePairs(firstSenatorId, secondSenatorId).then(votePairs => dispatch(Actions.receiveVotePairs(firstSenatorId, secondSenatorId, votePairs))).catch(err => console.error(err))
}

export function mark(voteId, userId, markType) {
  return dispatch => ServerAPI.sendUserMark(voteId, userId, markType).then(() => dispatch(Actions.modifyUserMark(voteId, userId, markType))).catch(err => console.error(err))
}

export function receiveUserInfo(user) {
  return dispatch =>  ServerAPI.sendUserInfo(user).catch(err => console.error(err))
}

export function fetchUsersFromServer() {
  return dispatch => ServerAPI.getUsers().then(users => {
      dispatch(Actions.receiveUsers(users))
      return users
  }).catch(err => console.error(err))
}

export function fetchUserMarksForVoteFromServer(voteId) {
  return dispatch => ServerAPI.getUserMarksForVote(voteId).then(bothMarks => dispatch(Actions.receiveUserMarksForVote(voteId, bothMarks[0], bothMarks[1]))).catch(err => console.error(err))
}

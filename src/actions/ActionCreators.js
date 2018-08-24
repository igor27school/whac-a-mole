import * as ServerAPI from '../utils/ServerAPI'
import * as Actions from './Actions'

export function fetchBillsFromServer() {
  return dispatch => ServerAPI.getBills().then(bills => {
      dispatch(Actions.receiveBills(bills))
      return bills
  }).catch(err => console.error(err))
}

/* Separate function for potential performance improvement in the future */
export function fetchBillFromServer(billId) {
  return dispatch => ServerAPI.getBills().then(bills => {
      dispatch(Actions.receiveBills(bills))
      return bills
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

export function fetchVotesForBillFromServer(billId) {
  return dispatch => ServerAPI.getVotesForBill(billId).then(votes => {
      dispatch(Actions.receiveVotesForBill(billId, votes))
      return votes
  }).catch(err => console.error(err))
}

export function fetchVotesForSenatorFromServer(senatorId) {
  return dispatch => ServerAPI.getVotesForSenator(senatorId).then(votes => dispatch(Actions.receiveVotesForSenator(senatorId, votes))).catch(err => console.error(err))
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

export function vote(id, voteType) {
  return dispatch => ServerAPI.sendVote(id, voteType).then(vote => dispatch(Actions.modifyVote(id, voteType))).catch(err => console.error(err))
}

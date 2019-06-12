import * as types from '../constants/ActionTypes'

export const receiveBills = bills => ({
  type: types.RECEIVE_BILLS,
  bills,
})

export const receiveSenators = senators => ({
  type: types.RECEIVE_SENATORS,
  senators,
})

export const receiveUser = user => ({
  type: types.RECEIVE_USER,
  user,
})

export const receiveUsers = users => ({
  type: types.RECEIVE_USERS,
  users,
})

export const receiveVotesForBill = (billId, votes) => ({
  type: types.RECEIVE_VOTES_FOR_BILL,
  billId,
  votes,
})

export const receiveVotesForSenator = (senatorId, votes) => ({
  type: types.RECEIVE_VOTES_FOR_SENATOR,
  senatorId,
  votes,
})

export const receiveVote = vote => ({
  type: types.RECEIVE_VOTE,
  vote,
})

export const receiveVotePairs = (firstSenatorId, secondSenatorId, votePairs) => ({
  type: types.RECEIVE_VOTE_PAIRS,
  firstSenatorId,
  secondSenatorId,
  votePairs,
})

export const modifyVote = (voteId, userId, voteType) => ({
  type: types.MODIFY_VOTE,
  voteId,
  userId,
  voteType,
})

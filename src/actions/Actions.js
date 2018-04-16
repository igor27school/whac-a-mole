import * as types from '../constants/ActionTypes'

export const receiveBills = bills => ({
  type: types.RECEIVE_BILLS,
  bills,
})

export const receiveSenators = senators => ({
  type: types.RECEIVE_SENATORS,
  senators,
})

export const receiveVotesForBill = (billId, votes) => ({
  type: types.RECEIVE_VOTES_FOR_BILL,
  billId,
  votes,
})

export const receiveVote = vote => ({
  type: types.RECEIVE_VOTE,
  vote,
})

import * as types from '../constants/ActionTypes'

export const receiveBill = bill => ({
  type: types.RECEIVE_BILL,
  bill,
})

export const receiveTallies = tallies => ({
  type: types.RECEIVE_TALLIES,
  tallies,
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

export const receiveVotesForTally = (tallyId, votes) => ({
  type: types.RECEIVE_VOTES_FOR_BILL,
  tallyId,
  votes,
})

export const receiveVotesForSenator = (senatorId, votes) => ({
  type: types.RECEIVE_VOTES_FOR_SENATOR,
  senatorId,
  votes,
})

export const receiveMarksForUser = (userId, upMarks, downMarks) => ({
  type: types.RECEIVE_MARKS_FOR_USER,
  userId,
  upMarks,
  downMarks,
})

export const receiveUserMarksForVote = (voteId, upMarks, downMarks) => ({
  type: types.RECEIVE_USER_MARKS_FOR_VOTE,
  voteId,
  upMarks,
  downMarks,
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

// Not currently looked for in reducer
export const modifyUserMark = (voteId, userId, markType) => ({
  type: types.MODIFY_USER_MARK,
  voteId,
  userId,
  markType,
})

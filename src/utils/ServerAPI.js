import { YES } from '../constants/ResultVotes'

const api = 'http://localhost:3001'

export const getBills = () =>
  fetch(`${api}/bills`).then(res => res.json())

export const getSenators = () =>
  fetch(`${api}/reps`).then(res => res.json())

export const getVotesForBill = billId => Promise.resolve([
  {
    _id: 'vote1',
    senatorId: 'senator1',
    billId: billId,
    resultVote: YES,
    down: 0,
    up: 0,
  },
  {
    _id: 'vote2',
    senatorId: 'senator2',
    billId: billId,
    resultVote: YES,
    down: 0,
    up: 0,
  },
])

export const getVotesForSenator = senatorId => Promise.resolve([
  {
    _id: 'vote1',
    senatorId: senatorId,
    billId: 'bill1',
    resultVote: YES,
    down: 0,
    up: 5,
  },
  {
    _id: 'vote2',
    senatorId: senatorId,
    billId: 'bill2',
    resultVote: YES,
    down: 5,
    up: 0,
  },
])

export const getVote = voteId => Promise.resolve(
  {
    _id: voteId,
    senatorId: 'senator2',
    billId: 'bill1',
    resultVote: YES,
    down: 0,
    up: 0,
  },
)

export const sendVote = voteId => Promise.resolve(
  {
    _id: voteId,
    senatorId: 'senator1',
    billId: 'bill1',
    resultVote: YES,
    down: 0,
    up: 0,
  }
)

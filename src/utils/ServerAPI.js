import { YES } from '../constants/ResultVotes'

export const getBills = () => Promise.resolve([
  {
    id: 'bill1',
    title: 'Bill 1',
    description: 'Bill description 1',
  },
  {
    id: 'bill2',
    title: 'Bill 2',
    description: 'Bill description 2',
  },
])

export const getSenators = () => Promise.resolve([
  {
    id: 'senator1',
    name: 'Senator name 1',
    state: 'MA',
  },
  {
    id: 'senator2',
    name: 'Senator name 2',
    state: 'CA',
  },
])

export const getVotesForBill = billId => Promise.resolve([
  {
    id: 'vote1',
    senatorId: 'senator1',
    billId: billId,
    resultVote: YES,
    down: 0,
    up: 0,
  },
  {
    id: 'vote2',
    senatorId: 'senator2',
    billId: billId,
    resultVote: YES,
    down: 0,
    up: 0,
  },
])

export const getVotesForSenator = senatorId => Promise.resolve([
  {
    id: 'vote1',
    senatorId: senatorId,
    billId: 'bill1',
    resultVote: YES,
    down: 0,
    up: 5,
  },
  {
    id: 'vote2',
    senatorId: senatorId,
    billId: 'bill2',
    resultVote: YES,
    down: 5,
    up: 0,
  },
])

export const getVote = voteId => Promise.resolve(
  {
    id: voteId,
    senatorId: 'senator2',
    billId: 'bill1',
    resultVote: YES,
    down: 0,
    up: 0,
  },
)

export const sendVote = voteId => Promise.resolve(
  {
    id: voteId,
    senatorId: 'senator1',
    billId: 'bill1',
    resultVote: YES,
    down: 0,
    up: 0,
  }
)

import { YES } from '../constants/ResultVotes'

export const getBills = () => Promise.resolve([
  {
    id: 'bill1',
    title: 'Bill 1',
  },
  {
    id: 'bill2',
    title: 'Bill 2',
  },
])

export const getSenators = () => Promise.resolve([
  {
    id: 'senator1',
    name: 'Senator name 1',
  },
  {
    id: 'senator2',
    name: 'Senator name 2',
  },
])

export const getVotesForBill = billId => Promise.resolve([
  {
    id: 'vote1',
    senatorId: 'senator1',
    billId: 'bill1',
    resultVote: YES,
  },
  {
    id: 'vote2',
    senatorId: 'senator2',
    billId: 'bill1',
    resultVote: YES,
  },
])

export const getVote = voteId => Promise.resolve([
  {
    voteId: `${voteId}`,
    senatorId: 'senator2',
    billId: 'bill1',
    resultVote: YES,
  },
])

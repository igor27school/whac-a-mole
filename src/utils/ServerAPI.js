import { YES } from '../constants/ResultVotes'

const api = 'http://localhost:3001'

export const getBills = () =>
  fetch(`${api}/bills`).then(res => res.json())

export const getSenators = () =>
  fetch(`${api}/reps`).then(res => res.json())

export const getUser = userId =>
  fetch(`${api}/user/${userId}`).then(res => res.json())

export const getUsers = () =>
  fetch(`${api}/users`).then(res => res.json())

export const getVotesForBill = billId =>
  fetch(`${api}/votes?billId=${billId}`).then(res => res.json())

export const getVotesForSenator = senatorId =>
  fetch(`${api}/votes?repId=${senatorId}`).then(res => res.json())

export const getVote = voteId =>
  fetch(`${api}/vote/${voteId}`).then(res => res.json())

export const getVotePairs = (firstSenatorId, secondSenatorId) =>
  fetch(`${api}/compare/${firstSenatorId}/${secondSenatorId}`).then(res => res.json())

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

export const sendUserInfo = user =>
  fetch(`${api}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(res => res.json())

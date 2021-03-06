const api = 'http://localhost:3001'

export const getBill = billId =>
  fetch(`${api}/bill/${billId}`).then(res => res.json())

export const getBills = () =>
  fetch(`${api}/bills`).then(res => res.json())

export const getOppositeVotes = (firstTallyId, secondTallyId) =>
  fetch(`${api}/compareTallies/${firstTallyId}/${secondTallyId}`).then(res => res.json())

export const getTallies = () =>
  fetch(`${api}/tallies`).then(res => res.json())

export const getTalliesForBill = billId =>
  fetch(`${api}/tallies?billId=${billId}`).then(res => res.json())

export const getSenators = () =>
  fetch(`${api}/reps`).then(res => res.json())

export const getUser = userId =>
  fetch(`${api}/user/${userId}`).then(res => res.json())

export const getUsers = () =>
  fetch(`${api}/users`).then(res => res.json())

export const getVotesForTally = tallyId =>
  fetch(`${api}/votes?tallyId=${tallyId}`).then(res => res.json())

export const getVotesForSenator = senatorId =>
  fetch(`${api}/votes?repId=${senatorId}`).then(res => res.json())

export const getVote = voteId =>
  fetch(`${api}/vote/${voteId}`).then(res => res.json())

export const getVotePairs = (firstSenatorId, secondSenatorId) =>
  fetch(`${api}/compare/${firstSenatorId}/${secondSenatorId}`).then(res => res.json())

export const sendUserMark = (voteId, userId, markType) =>
  fetch(`${api}/userMark`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({voteId, userId, markType})
  }).then(res => res.json())

export const sendUserInfo = user =>
  fetch(`${api}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(res => res.json())

export const getMarksForUser = userId =>
  fetch(`${api}/userMarks?userId=${userId}`).then(res => res.json())

export const getUserMarksForVote = voteId =>
  fetch(`${api}/userMarks?voteId=${voteId}`).then(res => res.json())

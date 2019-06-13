var mongoose = require('mongoose')
var express = require('express')
var router = express.Router()
var url = require('url')
var Rep = require('../models/Rep')
var Bill = require('../models/Bill')
var Vote = require('../models/Vote')
var User = require('../models/User')
var UserVote = require('../models/UserVote')

// GET home page.
router.get('/', function(req, res) {
  res.send('this will be the API router')
})

router.get('/reps', function(req, res) {
  Rep.find(function(err, reps) {
    if (err)
      res.send(err)
    res.json(reps)
  })
})

router.get('/user/:userId', function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err)
    res.json(user)
  })
})

router.get('/users', function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err)
    res.json(users)
  })
})

router.get('/bills', function(req, res) {
  Bill.find(function(err, bills) {
    if (err)
      res.send(err)
    res.json(bills)
  })
})

function getVotes(billId, repId) {
  var searchQuery = {}
  if (billId) {
    searchQuery['bill'] = billId
  }
  if (repId) {
    searchQuery['rep'] = repId
  }
  return new Promise(function (resolve, reject) {
    Vote.find(searchQuery, function(err, votes) {
      if (err) {
        reject(err)
      } else {
        resolve(votes)
      }
    })
  })
}

router.get('/votes', function(req, res) {
  var q = url.parse(req.url, true).query;
  getVotes(q.billId, q.repId)
      .then(votes => res.json(votes))
      .catch(err => res.send(err))
})

router.get('/vote/:voteId', function(req, res) {
  Vote.findById(req.params.voteId, function(err, vote) {
    if (err)
      res.send(err)
    res.json(vote)
  })
})

router.get('/compare/:firstSenatorId/:secondSenatorId', function(req, res) {
  Promise.all([
    getVotes(null, req.params.firstSenatorId),
    getVotes(null, req.params.secondSenatorId)
  ]).then(function (bothVotes) {
    const firstSenatorVotes = bothVotes[0]
    const secondSenatorVotes = bothVotes[1]
    let billsObject = {}
    firstSenatorVotes.forEach(function(vote) {
      billsObject[vote.bill] = [vote]
    })
    secondSenatorVotes.forEach(function(vote) {
      billsObject[vote.bill].push(vote)
    })
    let votePairs = []
    for (let i=0; i<firstSenatorVotes.length; i++) {
      const firstVote = billsObject[firstSenatorVotes[i].bill][0]
      const secondVote = billsObject[firstSenatorVotes[i].bill][1]
      if ((firstVote.outcome === "NO" && secondVote.outcome === "YES") || (firstVote.outcome === "YES" && secondVote.outcome === "NO")) {
        console.log("Found bill with opposite outcomes", firstSenatorVotes[i].bill)
        votePairs.push({
          bill: firstSenatorVotes[i].bill,
          firstVote: firstVote._id,
          secondVote: secondVote._id
        })
      }
    }
    res.json(votePairs)
  }).catch(err => res.send(err))
})

router.post('/user', function(req, res) {
  var user = new User(
    {
      _id: req.body.userId,
      name: req.body.name,
      picture: req.body.picture
    })
  user.save(function (err) {
    if (err) {
      console.error(err)
      return
    }
  })
})

router.post('/userVote', function(req, res) {
  var userVote = new UserVote(
    {
      vote: req.body.voteId,
      user: req.body.userId,
      voteType: req.body.voteType
    })
  userVote.save(function (err) {
    if (err) {
      console.error(err)
      return
    }
  })
})

function getUserVotes(voteId, userId, voteType) {
  var searchQuery = {}
  if (voteId) {
    searchQuery['vote'] = voteId
  }
  if (userId) {
    searchQuery['user'] = userId
  }
  if (voteType) {
    searchQuery['voteType'] = voteType
  }
  return new Promise(function (resolve, reject) {
    UserVote.find(searchQuery, function(err, votes) {
      if (err) {
        reject(err)
      } else {
        resolve(votes)
      }
    })
  })
}

router.get('/userVotes', function(req, res) {
  var q = url.parse(req.url, true).query;
  Promise.all([
    getUserVotes(q.voteId, q.userId, 'VOTE_UP'),
    getUserVotes(q.voteId, q.userId, 'VOTE_DOWN'),
  ]).then(bothVotes => res.json(bothVotes)).catch(err => res.send(err))
})

module.exports = router;

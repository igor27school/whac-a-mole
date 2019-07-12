var mongoose = require('mongoose')
var express = require('express')
var router = express.Router()
var url = require('url')
var Bill = require('../models/Bill')
var Rep = require('../models/Rep')
var Tally = require('../models/Tally')
var Vote = require('../models/Vote')
var User = require('../models/User')
var UserMark = require('../models/UserMark')

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

router.get('/bills', function(req, res) {
  Bill.find(function(err, bills) {
    if (err)
      res.send(err)
    res.json(bills)
  })
})

router.get('/bill/:billId', function(req, res) {
  Bill.findById(req.params.billId, function(err, bill) {
    if (err)
      res.send(err)
    res.json(bill)
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

router.get('/tallies', function(req, res) {
  var q = url.parse(req.url, true).query;
  var searchQuery = {}
  if (q.billId) {
    searchQuery['bill'] = q.billId
  }
  Tally.find(searchQuery, function(err, tallies) {
    if (err)
      res.send(err)
    res.json(tallies)
  })
})

function getVotes(tallyId, repId) {
  var searchQuery = {}
  if (tallyId) {
    searchQuery['tally'] = tallyId
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
  getVotes(q.tallyId, q.repId)
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
    let talliesObject = {}
    firstSenatorVotes.forEach(function(vote) {
      talliesObject[vote.tally] = [vote]
    })
    secondSenatorVotes.forEach(function(vote) {
      talliesObject[vote.tally].push(vote)
    })
    let votePairs = []
    for (let i=0; i<firstSenatorVotes.length; i++) {
      const firstVote = talliesObject[firstSenatorVotes[i].tally][0]
      const secondVote = talliesObject[firstSenatorVotes[i].tally][1]
      if ((firstVote.outcome === "NO" && secondVote.outcome === "YES") || (firstVote.outcome === "YES" && secondVote.outcome === "NO")) {
        console.log("Found tally with opposite outcomes", firstSenatorVotes[i].tally)
        votePairs.push({
          tally: firstSenatorVotes[i].tally,
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

router.post('/userMark', function(req, res) {
  const id = req.body.userId.concat(req.body.voteId)
  return new Promise(function (resolve, reject) {
    UserMark.update(
      { _id: id},
      {
        _id: id,
        vote: req.body.voteId,
        user: req.body.userId,
        markType: req.body.markType
      },
      { upsert: true },
      function(err, userMark) {
      if (err) {
        reject(err)
      } else {
        resolve(userMark)
      }
    })
  })
})

function getUserMarks(voteId, userId, markType) {
  var searchQuery = {}
  if (voteId) {
    searchQuery['vote'] = voteId
  }
  if (userId) {
    searchQuery['user'] = userId
  }
  if (markType) {
    searchQuery['markType'] = markType
  }
  return new Promise(function (resolve, reject) {
    UserMark.find(searchQuery, function(err, votes) {
      if (err) {
        reject(err)
      } else {
        resolve(votes)
      }
    })
  })
}

router.get('/userMarks', function(req, res) {
  var q = url.parse(req.url, true).query;
  Promise.all([
    getUserMarks(q.voteId, q.userId, 'MARK_UP'),
    getUserMarks(q.voteId, q.userId, 'MARK_DOWN'),
  ]).then(bothMarks => res.json(bothMarks)).catch(err => res.send(err))
})

module.exports = router;

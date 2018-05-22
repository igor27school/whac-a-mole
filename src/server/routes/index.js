var mongoose = require('mongoose')
var express = require('express')
var router = express.Router()
var url = require('url')
var Rep = require('../models/Rep')
var Bill = require('../models/Bill')
var Vote = require('../models/Vote')

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

router.get('/votes', function(req, res) {
  var q = url.parse(req.url, true).query;
  var searchQuery = {}
  if (q.billId) {
    searchQuery['bill'] = q.billId
    console.log('The bill id is', q.billId)
  }
  if (q.repId) {
    searchQuery['rep'] = q.repId
  }
  Vote.find(searchQuery, function(err, votes) {
    if (err)
      res.send(err)
    res.json(votes)
  })
})

router.get('/vote/:voteId', function(req, res) {
  Vote.findById(req.params.voteId, function(err, vote) {
    if (err)
      res.send(err)
    res.json(vote)
  })
})

module.exports = router;

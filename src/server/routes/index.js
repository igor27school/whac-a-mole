var express = require('express')
var router = express.Router()
var Rep = require('../models/Rep')
var Bill = require('../models/Bill')

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
    Bill.find(function(err, reps) {
      if (err)
        res.send(err)
      res.json(reps)
    })
  })

module.exports = router;

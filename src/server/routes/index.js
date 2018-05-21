var express = require('express')
var router = express.Router()
var Rep = require('../models/Rep')

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

module.exports = router;
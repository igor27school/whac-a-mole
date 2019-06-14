#! /usr/bin/env node

console.log('This script populates some reps to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url')

// Get arguments passed on command line
var userArgs = process.argv.slice(2)
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument')
    return
}

var async = require('async')
var fs = require('fs')
var Rep = require('./models/rep')
var Tally = require('./models/tally')
var Vote = require('./models/vote')

let reps = {}
let tallies = {}

var mongoose = require('mongoose')
var mongoDB = userArgs[0]
mongoose.connect(mongoDB)
var db = mongoose.connection
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

console.log('Database connection opened')

function repCreate(_id, name, state, link, cb) {
  var rep = new Rep({_id, name, state, link})

  rep.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    reps[rep['_id']] = rep
    cb(null, rep)
  })
}

function tallyCreate(_id, title, date, summary, link, cb) {
  var tally = new Tally({_id, title, date, summary, link})

  tally.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    tallies[tally['_id']] = tally
    cb(null, tally)
  })
}

function voteCreate(_id, rep, tally, outcome, link, cb) {
  var vote = new Vote({_id, rep, tally, outcome, link})

  vote.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    cb(null, vote)
  })
}

function createRepsAndTallies(cb) {
  console.log("Inside createRepsAndTallies")
  const array_functions = []
  const reps = JSON.parse(fs.readFileSync('/tmp/reps_senate.json'))
  for (let i=0; i<reps.length; i++) {
    let rep = reps[i]
    array_functions.push(function(callback) {
      if (!rep['link']) {
        console.log(rep)
      }
      repCreate(rep['_id'], rep['rep_name'], rep['state'], rep['link'], callback)
    })
  }
  const tallies = JSON.parse(fs.readFileSync('/tmp/tallies_senate.json'))
  for (let i=0; i<tallies.length; i++) {
    let tally = tallies[i]
    array_functions.push(function(callback) {
      tallyCreate(tally['_id'], tally['title'], tally['date'], tally['summary'], tally['link'], callback)
    })
  }
  async.parallel(array_functions, cb);
}

function createVotes(cb) {
  console.log("Inside createVotes")
  const array_functions = []
  const votes = JSON.parse(fs.readFileSync('/tmp/votes_senate.json'))
  for (let i=0; i<votes.length; i++) {
    let vote = votes[i]
    array_functions.push(function(callback) {
      voteCreate(vote['_id'], reps[vote['rep_id']], tallies[vote['tally_id']], vote['outcome'].toUpperCase(), vote['link'], callback)
    })
  }
  async.parallel(array_functions, cb);
}

async.series([
    createRepsAndTallies,
    createVotes
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Successfully saved reps, tallies and votes')

    }
    // All done, disconnect from database
    mongoose.connection.close();
});

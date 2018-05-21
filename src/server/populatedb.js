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
var Bill = require('./models/bill')
var Vote = require('./models/vote')

let reps = {}
let bills = {}

var mongoose = require('mongoose')
var mongoDB = userArgs[0]
mongoose.connect(mongoDB)
var db = mongoose.connection
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

function repCreate(_id, name, state, cb) {
  var rep = new Rep({_id, name, state})

  rep.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Rep: ' + rep)
    reps[rep['_id']] = rep
    cb(null, rep)
  })
}

function billCreate(_id, title, summary, cb) {
  var bill = new Bill({_id, title, summary})

  bill.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Bill: ' + bill)
    bills[bill['_id']] = bill
    cb(null, bill)
  })
}

function voteCreate(_id, rep, bill, outcome, cb) {
  var vote = new Vote({_id, rep, bill, outcome})

  vote.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Vote: ' + vote)
    cb(null, vote)
  })
}

function createRepsAndBills(cb) {
  const array_functions = []
  const reps = JSON.parse(fs.readFileSync('/tmp/reps_senate.json'))['reps']
  for (let i=0; i<reps.length; i++) {
    let rep = reps[i]
    array_functions.push(function(callback) {
      repCreate(rep['_id'], rep['rep_name'], rep['state'], callback)
    })
  }
  const bills = JSON.parse(fs.readFileSync('/tmp/bills_senate.json'))['bills']
  for (let i=0; i<bills.length; i++) {
    let bill = bills[i]
    array_functions.push(function(callback) {
      billCreate(bill['_id'], bill['title'], bill['summary'], callback)
    })
  }
  async.parallel(array_functions, cb);
}

function createVotes(cb) {
  const array_functions = []
  const votes = JSON.parse(fs.readFileSync('/tmp/votes_senate.json'))['votes']
  for (let i=0; i<votes.length; i++) {
    let vote = votes[i]
    array_functions.push(function(callback) {
      voteCreate(vote['_id'], reps[vote['rep_id']], bills[vote['bill_id']], vote['outcome'].toUpperCase(), callback)
    })
  }
  async.parallel(array_functions, cb);
}

async.series([
    createRepsAndBills,
    createVotes
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Successfully saved reps, bills and votes')

    }
    // All done, disconnect from database
    mongoose.connection.close();
});

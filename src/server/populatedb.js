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
    cb(null, rep)
  }  )
}

function createReps(cb) {
    const reps = JSON.parse(fs.readFileSync('/tmp/reps_senate.json'))['reps']
    const array_functions = []
    for (let i=0; i<reps.length; i++) {
      let rep = reps[i]
      array_functions.push(function(callback) {
        repCreate(rep['_id'], rep['rep_name'], rep['state'], callback)
      })
    }
    async.parallel(array_functions,
        // optional callback
        cb);
}

createReps(function(err, results) {
  if (err) {
      console.log('FINAL ERR: '+err);
  }
  else {
      console.log('Successfully saved reps.')

  }
  // All done, disconnect from database
  mongoose.connection.close()
})

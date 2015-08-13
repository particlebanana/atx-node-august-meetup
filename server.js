/**
 * The main web server
 *
 * Responsible for responding to web request and queuing jobs
 */

var express = require('express');
var resque = require('node-resque');
var async = require('async');
var config = require('./lib/config');
var jobs = require('./lib/jobs');
var app = express();
var queue;

// define a simple route
app.get('/', function (req, res) {

  // Send 1000 "emails"
  var count = 0;

  async.whilst(

    // while count < 1000
    function () {
      return count < 1000;
    },

    // queue up email operations
    function (cb) {
      count++;
      queue.enqueue('emailQueue', 'sendEmail', { email: 'count_' + count + '@test.com' });
      setImmediate(cb);
    },

    // Respond to the request
    function (err) {
      res.send('Sending emails');
    }
  );

});

// start a server on port 1337
var startServer = function() {
  app.listen(1337, function() {
    console.log('Listening on port 1337');
  });
};

// connect to the job queue
queue = new resque.queue({ connection: config }, jobs, startServer);

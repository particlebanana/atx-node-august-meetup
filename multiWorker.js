/**
 * The main worker
 *
 * Responsible for pulling a job off the queue and processing it
 */

var resque = require('node-resque');
var config = require('./lib/config');
var jobs = require('./lib/jobs');
var multiWorker;

// Define which queues this worker will process
var queues = ['emailQueue'];

// Start a worker
var startWorker = function() {
  multiWorker.start();
};

multiWorker = new resque.multiWorker({
  connection: config,
  queues: ['emailQueue'],
  minTaskProcessors:   1,
  maxTaskProcessors:   100,
  checkTimeout:        1000,
  maxEventLoopDelay:   10,
  toDisconnectProcessors: true,
}, jobs, startWorker);

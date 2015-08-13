/**
 * The main worker
 *
 * Responsible for pulling a job off the queue and processing it
 */

var resque = require('node-resque');
var config = require('./lib/config');
var jobs = require('./lib/jobs');
var worker;

// Define which queues this worker will process
var queues = ['emailQueue'];

// Start a worker
var startWorker = function() {
  // cleanup any previous improperly shutdown workers on this host
  worker.workerCleanup();
  worker.start();
};

worker = new resque.worker({ connection: config, queues: queues }, jobs, startWorker);

worker.on('start',           function(){ console.log('worker started'); });
worker.on('end',             function(){ console.log('worker ended'); });
worker.on('cleaning_worker', function(worker, pid){ console.log('cleaning old worker ' + worker); });
worker.on('poll',            function(queue){ console.log('worker polling ' + queue); });
worker.on('job',             function(queue, job){ console.log('working job ' + queue + ' ' + JSON.stringify(job)); });
worker.on('reEnqueue',       function(queue, job, plugin){ console.log('reEnqueue job (' + plugin + ') ' + queue + ' ' + JSON.stringify(job)); });
worker.on('success',         function(queue, job, result){ console.log('job success ' + queue + ' ' + JSON.stringify(job) + ' >> ' + result); });
worker.on('failure',         function(queue, job, failure){ console.log('job failure ' + queue + ' ' + JSON.stringify(job) + ' >> ' + failure); });
worker.on('error',           function(queue, job, error){ console.log('error ' + queue + ' ' + JSON.stringify(job) + ' >> ' + error); });
worker.on('pause',           function(){ console.log('worker paused'); });
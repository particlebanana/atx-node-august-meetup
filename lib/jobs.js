// job listing
module.exports = {

  sendEmail: function(data, cb){
    setTimeout(function() {
      console.log('send email to: ' + data.email);
      cb();
    }, 1000);
  }

};
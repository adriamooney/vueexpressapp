const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let options = {
  useMongoClient: true
  // autoIndex: false, // Don't build indexes
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  // poolSize: 10, // Maintain up to 10 socket connections
  // // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0
};


// mongoose.connect(process.env.MONGODB_URI, options);

mongoose.connect(process.env.MONGODB_URI, options, function(error) {
  // Check error in initial connection. There is no 2nd param to the callback.
  if(error) {
  	console.log(error)
  }
});

module.exports = {mongoose};



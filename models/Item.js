const mongoose = require('mongoose');

// Define collection and schema for Items
var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true //trims whitespace
  },
  price: {
    type: Number,
    required: true
  }
},{
    collection: 'items'
});

// module.exports = mongoose.model('Item', Item);
let Item = mongoose.model('Item', UserSchema);

module.exports = {Item};

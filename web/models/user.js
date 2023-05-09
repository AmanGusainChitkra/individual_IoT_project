const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,

  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    index: true
  },
  password:{
    type: String,
    required: true

  }
}, {
  timestamps: true
});
userSchema.plugin(uniqueValidator)
const User = mongoose.model('users', userSchema);
module.exports = User;

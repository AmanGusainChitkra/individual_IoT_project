const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique:true,
    index:true
  },
  description: {
    type: String,
    trim: true
  },
  location:{
    type: String,
    trim:true
  },
  category:{
    type: String,
    trim:true
  },
  data:{
    type: Object,
    trim: true,
    default:{}
  }
}, {
  timestamps: true
});
deviceSchema.plugin(uniqueValidator)
const Device = mongoose.model('devices', deviceSchema);

module.exports = Device;

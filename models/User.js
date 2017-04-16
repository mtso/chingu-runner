const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  date_started: {
    type: Date,
    default: Date.now,
  },
  latest_done: {
    type: Date,
  },
})

module.exports = mongoose.model('user', UserSchema)

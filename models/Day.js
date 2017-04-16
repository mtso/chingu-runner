const mongoose = require('mongoose')

const DaySchema = new mongoose.Schema({
  _user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('day', DaySchema)

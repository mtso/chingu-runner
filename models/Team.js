const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  webhook: {
    type: String
  }
})

module.exports = mongoose.model('team', TeamSchema)

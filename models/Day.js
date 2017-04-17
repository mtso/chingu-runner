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
  isDone: {
    type: Boolean,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  completed_at: {
    type: Date,
  },
})

// Not sure if this works. (http://stackoverflow.com/a/7592756/2684355)
// DaySchema.statics.findAndModify = function (query, sort, doc, options, callback) {
//   return this.collection.findAndModify(query, sort, doc, options, callback);
// };

module.exports = mongoose.model('day', DaySchema)

const Day = require('../models/Day')
const EphemeralError = require('../utils/ephemeral-error')
const EphemeralMessage = require('../utils/ephemeral-message')

function undone(body, args) {
  return new Promise((resolve, reject) => {
    Day
      .find({_user_id: body.user_id, isDone: true})
      .sort({created_at: -1})
      .limit(1)
      .exec(handleFound)

    function handleFound(err, data) {
      if (err) {
        console.error(err)
        return reject(new EphemeralError(err))
      }
      if (data.length < 1) {
        let response = new EphemeralMessage('No items to mark not done.')
        return resolve(response)
      }
      let toUndo = data.shift()
      toUndo.isDone = false
      toUndo.save(handleSave)
    }

    function handleSave(err, updatedUndo) {
      if (err) {
        return reject(new EphemeralError(err))
      }
      resolve(new EphemeralMessage('Marked "' + updatedUndo.title + '" as not done.'))
    }
  })
}

module.exports = undone

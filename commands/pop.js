const Day = require('../models/Day')
const EphemeralError = require('../utils/ephemeral-error')
const EphemeralMessage = require('../utils/ephemeral-message')

function pop(body, args) {
  return new Promise((resolve, reject) => {
    Day
      .find({_user_id: body.user_id})
      .sort({created_at: -1})
      .limit(1)
      .exec(handleFound)

    function handleFound(err, data) {
      if (err) {
        console.error(err)
        return reject(new EphemeralError(err))
      }
      if (data.length < 1) {
        let response = new EphemeralMessage('No items to delete.')
        return resolve(response)
      }
      let toDelete = data.shift()
      toDelete.remove(handleRemoval(toDelete.title))
    }

    function handleRemoval(title) {
      return (err, result) => {
        if (err) {
          return reject(new EphemeralError(err))
        }
        resolve(new EphemeralMessage('Removed ' + title))
      }
    }
  })
}

module.exports = pop

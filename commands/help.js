const EphemeralMessage = require('../utils/ephemeral-message')

function help(body, args) {
  return new Promise((resolve, reject) => {
    // Add help text (or this is just the same as inputting an unrecognized command)
    let message = 'The available commands are: add, done, list, and help'
    resolve(new EphemeralMessage(message))
  })
}

module.exports = help

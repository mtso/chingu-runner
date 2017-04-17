const EphemeralMessage = require('../utils/ephemeral-message')

function help(body, args) {
  return new Promise((resolve, _) => {
    // Add help text (or this is just the same as inputting an unrecognized command)
    // let message = 'The available commands are: add, done, list, and help'
    // resolve(new EphemeralMessage(message))

    let attachments = [
      {
        color: '#FFFB02',
        text: 'Chingu Runner commands:',
        fields: [
          {
            title: '`/run add [title]` adds an item to your speedrun list'
          },
          {
            title: '`/run done` marks today\'s item as complete'
          },
          {
            title: '`/run list` prints a list of all your items'
          },
          {
            title: '`/run pop` removes the last item from your list'
          },
          {
            title: '`/run undone` marks the latest done item as not done'
          },
        ],
        mrkdn_in: ['fields', 'title'],
        footer: '<https://chingurunner.herokuapp.com/ | Chingu Runner>',
      }
    ]
    let response = {
      response_type: 'ephemeral',
      attachments,
    }
    resolve(response)
  })
}

module.exports = help

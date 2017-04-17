const EphemeralMessage = require('../utils/ephemeral-message')

function help(body, args) {
  return new Promise((resolve, _) => {
    // Add help text (or this is just the same as inputting an unrecognized command)
    // let message = 'The available commands are: add, done, list, and help'
    // resolve(new EphemeralMessage(message))

    let attachments = [
      {
        color: '#FFFB02',
        title: 'Chingu Runner commands:',
        fields: [
          {
            title: '`/run add [title]` Adds an item to your speedrun list',
            // value: '`/run add [title]`',
          },
          {
            title: '`/run done` Marks today\'s item as complete',
            // value: '`/run done`',
          },
          {
            title: '`/run list` Print a list of all your items',
            // value: '`/run list`',
          },
          {
            title: '`/run pop` Removes the last item from your list',
            // value: '`/run pop`',
          },
          {
            title: '`/run undone` Marks the latest done item as not done',
            // value: '`/run undone`',
          },
        ],
        mrkdwn_in: ['fields'],
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

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
            title: 'Adds an item to your speedrun list',
            value: '```/run add [title]```',
            short: false,
          },
          {
            title: 'Marks today\'s item as complete',
            value: '```/run done```',
            short: false,
          },
          {
            title: 'Print a list of all your items',
            value: '```/run list```',
            short: false,
          },
          {
            title: 'Removes the last item from your list',
            value: '```/run pop```',
            short: false,
          },
          {
            title: 'Marks the latest done item as not done',
            value: '```/run undone```',
            short: false,
          },
        ],
        mrkdn_in: ['fields', 'text'],
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

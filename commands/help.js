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
            text: '```/run add [title]```',
            mrdkwn: true,
          },
          {
            title: 'Marks today\'s item as complete',
            text: '```/run done```',
            mrdkwn: true,
          },
          {
            title: 'Print a list of all your items',
            text: '```/run list```',
            mrdkwn: true,
          },
          {
            title: 'Removes the last item from your list',
            text: '```/run pop```',
            mrdkwn: true,
          },
          {
            title: 'Marks the latest done item as not done',
            text: '```/run undone```',
            mrdkwn: true,
          },
        ],
        mrkdn_in: ['fields'],
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

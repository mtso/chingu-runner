const EphemeralMessage = require('../utils/ephemeral-message')

const attachments = [
  {
    color: '#FFFB02',
    text: 'Chingu Runner commands:',
    fields: [
      {
        title: 'Adds an item to your speedrun list',
        value: '```/run add [title]```',
      },
      {
        title: 'Marks today\'s item as complete',
        value: '```/run done```',
      },
      {
        title: 'Print a list of all your items',
        value: '```/run list```',
      },
      {
        title: 'Removes the last item from your list',
        value: '```/run pop```',
      },
      {
        title: 'Marks the latest done item as not done',
        value: '```/run undone```',
      },
    ],
    mrkdwn_in: ['fields'],
    footer: '<https://chingurunner.herokuapp.com/ | Chingu Runner>',
  }
]

function help(body, args) {
  return new Promise((resolve, _) => {
    let response = {
      response_type: 'ephemeral',
      attachments,
    }
    resolve(response)
  })
}

module.exports = help

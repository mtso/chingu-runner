All commands are passed through the runner controller. In order to add a command,
it must be exported through the `index.js` file of this package.

The `runner` will pass the request's body as an object containing the data posted by Slack [](https://api.slack.com/slash-commands) for the first parameter, and the rest of the command's text for the second parameter.

The `runner` expects a Promise object in return and uses it to respond to the user through `then` or `catch`.

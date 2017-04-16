function echo(body, args) {
  return new Promise((resolve, reject) => {
    let response = {
      response_type: 'ephemeral',
      text: 'Hello, you tried echo on ' + args
    }
    return resolve(response)
  })
}

module.exports = echo

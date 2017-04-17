function EphemeralMessage(text) {
  this.response_type = 'ephemeral'
  this.text = text
}

module.exports = EphemeralMessage

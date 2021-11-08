module.exports = function (RED) {
  function WebdavConfigNode (config) {
    RED.nodes.createNode(this, config)
    this.url = config.url
    this.insecure = config.insecure
  }

  RED.nodes.registerType('webdav-credentials', WebdavConfigNode, {
    credentials: {
      user: { type: 'text' },
      pass: { type: 'password' }
    }
  })
}

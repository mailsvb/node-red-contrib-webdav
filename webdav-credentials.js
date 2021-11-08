module.exports = function (RED) {
  function WebdavConfigNode (config) {
    RED.nodes.createNode(this, config)
    this.address = config.url
    this.insecure = config.insecure
  }

  RED.nodes.registerType('webdav-credentials', WebdavConfigNode, {
    credentials: {
      user: { type: 'text' },
      pass: { type: 'password' }
    }
  })
}

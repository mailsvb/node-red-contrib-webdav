const { createClient } = require('webdav')
const https = require('https')

module.exports = function (RED) {
  function WebDavWrite (config) {
    RED.nodes.createNode(this, config)
    this.server = RED.nodes.getNode(config.server)
    this.directory = config.directory
    this.filename = config.filename
    this.overwrite = config.overwrite
    this.format = config.format
    const node = this

    node.on('input', (msg) => {
      // Read upload file
      let filename = node.filename
      if (msg.filename) {
        filename = msg.filename
      }
      const name = filename.substr((filename.lastIndexOf('/') + 1), filename.length)
      // Set upload directory
      let directory = '/'
      if (msg.directory) {
        directory += msg.directory + '/'
      } else if (node.directory && node.directory.length) {
        directory += node.directory + '/'
      }
      directory = directory.replace('//', '/')

      const webDavUri = node.server.address
      const client = createClient(webDavUri, {
        username: node.server.credentials.user,
        password: node.server.credentials.pass
      })

      // check option for self signed certs
      const option = {
        format: node.format
      }
      if (node.server.insecure) {
        option.httpsAgent = new https.Agent({ rejectUnauthorized: false })
      }
      if (node.overwrite) {
        option.overwrite = true
      }

      client.putFileContents(directory + name, msg.payload, option)
        .then(function (content) {
          node.send(Object.assign({}, msg,
            {
              status: content.status,
              statusText: content.statusText
            }))
        }).catch(function (error) {
          node.error(error.toString(), msg)
        })
    })
  }
  RED.nodes.registerType('webdav-write', WebDavWrite)
}

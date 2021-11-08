const { createClient } = require('webdav')
const path = require('path')
const https = require('https')

module.exports = function (RED) {
    function WebDavList (config) {
        RED.nodes.createNode(this, config)
        const node = this
        node.server = RED.nodes.getNode(config.server)
        node.directory = config.directory

        node.on('input', (msg) => {
            // directory
            const directory = path.join('/', msg.directory ? msg.directory : node.directory)

            const webDavUrl = node.server.url
            const client = createClient(webDavUrl, {
                username: node.server.credentials.user,
                password: node.server.credentials.pass
            })

            // options
            const options = {}
            if (node.server.insecure) {
                options.httpsAgent = new https.Agent({ rejectUnauthorized: false })
            }

            client.getDirectoryContents(directory, options)
            .then(function (content) {
                node.send(Object.assign({}, msg, { payload: content }))
            }, function (error) {
                node.error(error.toString(), msg)
            })
        })
    }

  RED.nodes.registerType('webdav-list', WebDavList)
}

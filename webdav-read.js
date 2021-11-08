const { createClient } = require('webdav')
const path = require('path')
const https = require('https')

module.exports = function (RED) {
    function WebDavOut (config) {
        RED.nodes.createNode(this, config)
        const node = this
        node.server = RED.nodes.getNode(config.server)
        node.filename = config.filename
        node.output = config.output

        node.on('input', (msg) => {
            if (!msg.filename && !node.filename) {
                node.error('WebDAV -> no filename specified.', msg)
                return
            }
            // filename
            const filename = path.join('/', msg.filename ? msg.filename : node.filename)

            const webDavUrl = node.server.url
            const client = createClient(webDavUrl, {
                username: node.server.credentials.user,
                password: node.server.credentials.pass
            })

            // options
            const options = {
                format: node.output
            }
            if (node.server.insecure) {
                options.httpsAgent = new https.Agent({ rejectUnauthorized: false })
            }

            client.getFileContents(filename, options)
            .then(function (content) {
                node.send(Object.assign({}, msg, { payload: content }))
            }, function (error) {
                node.error(error.toString(), msg)
            })
        })
    }
    RED.nodes.registerType('webdav-read', WebDavOut)
}

const { createClient } = require('webdav')
const https = require('https')
const path = require('path')

module.exports = function (RED) {
    function WebDavWrite (config) {
        RED.nodes.createNode(this, config)
        const node = this
        node.server = RED.nodes.getNode(config.server)
        node.directory = config.directory
        node.filename = config.filename
        node.overwrite = config.overwrite
        node.format = config.format

        node.on('input', (msg) => {
            // filename
            const filename = msg.filename ? msg.filename : node.filename

            // directory
            const directory = path.join('/', msg.directory ? msg.directory : node.directory)

            const webDavUrl = node.server.url
            const client = createClient(webDavUrl, {
            username: node.server.credentials.user,
                password: node.server.credentials.pass
            })

            // check option for self signed certs
            const options = {
                format: node.format
            }
            if (node.server.insecure) {
                options.httpsAgent = new https.Agent({ rejectUnauthorized: false })
            }
            if (node.overwrite) {
                options.overwrite = true
            }

            client.putFileContents(directory + name, msg.payload, options)
            .then(function (content) {
                node.send(Object.assign({}, msg, { status: content.status, statusText: content.statusText }))
            }).catch(function (error) {
                node.error(error.toString(), msg)
            })
        })
    }
    RED.nodes.registerType('webdav-write', WebDavWrite)
}

const dav = require('dav')
const webdav = require('webdav')
const fs = require('fs')
const IcalExpander = require('ical-expander')
const moment = require('moment')
const https = require('https')

module.exports = function (RED) {
  function DavConfigNode (config) {
    RED.nodes.createNode(this, config)
    this.address = config.address + '/' + config.basePath
    this.basePath = config.basePath
    this.address = this.address.replace('//', '/')
    this.insecure = config.insecure
  }

  RED.nodes.registerType('dav-credentials', DavConfigNode, {
    credentials: {
      user: { type: 'text' },
      pass: { type: 'password' }
    }
  })
}

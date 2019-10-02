# node-red-contrib-nextcloud

[![Greenkeeper badge](https://badges.greenkeeper.io/CordlessWool/node-red-node-webdav.svg)](https://greenkeeper.io/)

Collection of node-red nodes to download Calendars (CalDAV) and Contacts
(CardDAV) and up- / download / list files (WebDAV) from / to [nextcloud](https://nextcloud.com/)

Detailed information can be found in the build in info of each node

## Installation
npm install node-red-contrib-webdav

### WebDAV
- based on [webdav](https://github.com/perry-mitchell/webdav-client) package using WebDAV protocol

##### Read content of a server directory
- reads content of the users root directory if no folder is specified
- reads content of a given directory specified in node properties or incoming message

##### Upload a file to a server directory
- uploads a file to nextcloud server
- absolute path of upload file can be set in node properties or incoming message
- server directory can be set in node properties or incoming message

##### Download a file from a server directory
- downloads a file from nextcloud server
- file on server can be set in node properties or incoming message
- sends file as binary buffer to the output. File can be stored using file node

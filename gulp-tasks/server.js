const sync = require('browser-sync')

exports.server = function server() {
  sync.init({
    server: './dist',
    notify: false,
    online: false
  })
  
}
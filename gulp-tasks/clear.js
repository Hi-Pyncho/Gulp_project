const del = require('del')

exports.clear = function clear() {
  return del('dist')
}
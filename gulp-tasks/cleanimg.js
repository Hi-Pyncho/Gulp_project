const del = require('del')

exports.cleanimg = function cleanimg() {
  return del('dist/img/**/*')
}
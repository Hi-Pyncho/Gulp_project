// import packages
const {series, parallel} = require('gulp')

// import gulp tasks
const {styles} = require('./gulp-tasks/styles')
exports.styles = styles

const {images} = require('./gulp-tasks/images')
exports.images = images

const {tinyPNG} = require('./gulp-tasks/tinyPNG')
exports.tinyPNG = tinyPNG

const {html} = require('./gulp-tasks/html')
exports.html = html

const {scripts} = require('./gulp-tasks/scripts')
exports.scripts = scripts

const {clear} = require('./gulp-tasks/clear')
exports.clear = clear

const {cleanimg} = require('./gulp-tasks/cleanimg')
exports.cleanimg = cleanimg

const {server} = require('./gulp-tasks/server')
exports.server = server

const {watch} = require('./gulp-tasks/watch')
exports.watch = watch



exports.build = series(
  clear, 
  parallel(styles, 
  html, 
  scripts, 
  images
  )
) 
  
exports.default = series(
  parallel(
    html,
    styles,
    scripts,
    images
  ),
  parallel(
    server,
    watch
  )
)
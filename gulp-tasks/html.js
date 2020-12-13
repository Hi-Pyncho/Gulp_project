const {src, dest} = require('gulp')
const sync = require('browser-sync')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')

exports.html = function html() {
  return src('app/*.html')
    .pipe(include({
      prefix: '@@'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest('dist'))
    .pipe(sync.stream())
}

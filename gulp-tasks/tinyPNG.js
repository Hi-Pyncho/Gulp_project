const {src, dest} = require('gulp')
const tinypng = require('gulp-tinypng-compress')
const newer = require('gulp-newer')

exports.tinyPNG = function tinyPNG() {
  return src('app/images/**')
    .pipe(newer('dist/img'))
    .pipe(tinypng({
      key: 'jhG5szqxBkFfR61jmmtXLkSNF31DtmM6',
      log: true
    }))
    .pipe(dest('dist/img'))
}
const {src, dest} = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default

exports.scripts = function scripts() {
  return src([
    'app/js/modules/**/*.js',
    'app/js/main.js'
    ])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('dist'))
}
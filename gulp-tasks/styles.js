
const {src, dest} = require('gulp')
const autoprefixer = require ('gulp-autoprefixer')
const sass = require ('gulp-sass')
const concat = require ('gulp-concat')
const sync = require ('browser-sync')

exports.styles = function styles() {
  return src('app/styles/main.scss')
    .pipe(autoprefixer({
      cascade: false,
      grid: true
    }))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(concat('style.min.css'))
    .pipe(dest('dist'))
    .pipe(sync.stream())
}
const {src, dest} = require('gulp')
const newer = require('gulp-newer')
const imagemin = require('gulp-imagemin')

exports.images = function images() {
  return src('app/images/**')
    .pipe(newer('dist/img'))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(dest('dist/img'))
}
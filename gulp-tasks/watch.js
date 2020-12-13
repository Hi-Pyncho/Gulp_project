const {html, styles, images, scripts} = require('../gulpfile')
const {watch, parallel} = require('gulp')
const sync = require('browser-sync')

exports.watch = function watching() {
  watch('app/*.html', parallel(html)).on('change', sync.reload)
  watch('app/styles/*.scss', parallel(styles)).on('change', sync.reload)
  watch('app/js/**/*.js', parallel(scripts)).on('change', sync.reload)
  watch('app/images/**', parallel(images)).on('change', sync.reload)
}
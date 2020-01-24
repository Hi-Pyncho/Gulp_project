//Подключаем модули галпа
const gulp = require('gulp');
//объединение файлов
const concat = require('gulp-concat');
//добавление префиксов
const autoprefixer = require('gulp-autoprefixer');
//оптимизация стилей
const cleanCSS = require('gulp-clean-css');
// оптимизация скриптов
const uglify = require('gulp-uglify');
//удаление файлов
const del = require('del');
//синхронизация с браузером
const browserSync = require('browser-sync').create();
//компилятор SASS
const sass = require('gulp-sass');
//для препроцессоров стилей
const sourceMap = require('gulp-sourcemaps');
// для остлеживания изменений
const Gulpwatch = require('gulp-watch')
// для оптимизации изображений
const imagemin = require('gulp-imagemin');

//порядок подключения css стилей
const styleFiles = [
    './src/css/main.scss',
    './src/css/media.scss'
]

//порядок подключения js скриптов
const scriptFiles = [
    './src/js/lib.js',
    './src/js/main.js'
]


//Таск для обработки стилей
gulp.task('styles', () => {
    //Шаблон для поиска файлов CSS
    //Всей файлы по шаблону './src/css/**/*.css'
    return gulp.src(styleFiles)
       .pipe(sourceMap.init())
       //Указать stylus() , sass() или less()
       .pipe(sass())
       //Объединение файлов в один
       .pipe(concat('style.css'))
       //Добавить префиксы
       .pipe(autoprefixer({
         overrideBrowserslist: ['last 2 versions'],
          cascade: false
       }))
       //минифицируем CSS файл (ур 2 - жесткая минификация)
       .pipe(cleanCSS({
          level: 2
       }))
       .pipe(sourceMap.write('./'))
       //Выходная папка для стилей
       .pipe(gulp.dest('./build/css'))
       //для обновления стилей на сайте
       .pipe(browserSync.stream());
 });



//Таск для обработки скриптов
gulp.task('scripts', () => {
    //Шаблон для поиска файлов JS
    //Всей файлы по шаблону './src/js/**/*.js'
    return gulp.src(scriptFiles)
       //Объединение файлов в один
       .pipe(concat('script.js'))
       //минифицируем файл JS + сокращает имена(труднее читать)
       // {toplevel: true} - в скобках //макс ур-нь миниф-ии. сокр-т названия переменных//Минификация JS
       .pipe(uglify({
          toplevel: true
       }))
       //Выходная папка для скриптов
       .pipe(gulp.dest('./build/js'))
       //для обновления скриптов на сайте   
       .pipe(browserSync.stream());
 });
 
 //Таск для очистки папки build
 gulp.task('del', () => {
    return del(['build/*'])
 });
 
// таск для оптимизации изображений
gulp.task('img-compress', () => {
   //любые вложенности в img
   return gulp.src('./src/img/**')
   .pipe(imagemin( {
      progressive: true
   }))
   // тут сохранятся эти вложенности, то есть сохраняется изначальная структура папок
   .pipe(gulp.dest('./build/img/'))
})

 //Таск для отслеживания изменений в файлах
 gulp.task('watch', () => {
    browserSync.init({
       server: {
          baseDir: "./"
       }
    });
    // следить за изменениями папок с изобаржениями
    gulp.watch('./src/img/**', gulp.series('img-compress'))
    //Следить за файлами со стилями с нужным расширением
    gulp.watch('./src/css/**/*.scss', gulp.series('styles'))
    //Следить за JS файлами
    gulp.watch('./src/js/**/*.js', gulp.series('scripts'))
    //При изменении HTML запустить синхронизацию
    gulp.watch("./*.html").on('change', browserSync.reload);
 });
 
 //Таск по умолчанию, Запускает del, styles, scripts и watch
 // default - название по умолчанию - то есть можно запускать этот таск просто введя gulp
 gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts', 'img-compress'), 'watch'));



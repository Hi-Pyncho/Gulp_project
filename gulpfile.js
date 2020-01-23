//Подключаем модули галпа
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();

//порядок подключения css стилей
const cssFiles = [
    './src/css/main.css',
    './src/css/media.css'
]

//порядок подключения js скриптов
const jsFiles = [
    './src/js/lib.js',
    './src/js/main.js'
]

//Таск на стили CSS
function styles() {
    //Шаблон для поиска файлов CSS
    //Все файды по шаблону './src/css/**/*.css'
    return gulp.src(cssFiles)
    //объединение файлов в один
    .pipe(concat('style.css'))
    //добавляем префиксы к css
    .pipe(autoprefixer({
        cascade: false
    }))
    //минифицируем CSS файл (ур 2 - жесткая минификация)
    .pipe(cleanCSS({level: 2}))
    //Выходная папка для стилей
    .pipe(gulp.dest('./build/css'))
    //для обновления стилей на сайте
    .pipe(browserSync.stream());
}

//Таск на скрипты JS
function scripts () {
    //Шаблон для поиска файлов JS
    //Все файды по шаблону './src/js/**/*.js'
    return gulp.src(jsFiles)
    //объединение файлов в один
    .pipe(concat('script.js'))
    //Выходная папка для стилей
    //минифицируем файл JS + сокращает имена(труднее читать)
    // {toplevel: true} - в скобках //макс ур-нь миниф-ии. сокр-т названия переменных
    .pipe(uglify())
    //Выходная папка для скриптов
    .pipe(gulp.dest('./build/js'))
    //для обновления скриптов на сайте
    .pipe(browserSync.stream());
}
//функция для очистки всех файлов в папке
function clean() {
    return del(['build/*'])
}
//просматривать файлы
function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    //** - все каталоги внутри, *.css - любое название с таким расширением
    //следить за CSS файлами
    gulp.watch('./src/css/**/*.css', styles)
    //следить за JS файлами
    gulp.watch('./src/js/**/*.js', scripts)
    //при изменении HTML запустить синхронизацию
    gulp.watch("./*.html").on('change', browserSync.reload);
}

//Таск, вызывающий функцию styles (первый параметр - название таска (gulp styles), второй - сама функция)
gulp.task('styles', styles);
//Таск, вызывающий функцию scripts
gulp.task('scripts', scripts);
//Таск для очистки папки
gulp.task('del', clean);
//таск для отслеживания изменений
gulp.task('watch', watch);
//таск для удаления файлов в папке build и запуск styles и scripts
// gulp.series - выполнять последовательно
// gulp.parallel - выполнять параллельно
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
// таск запускает последовательно build и watch
gulp.task('dev', gulp.series('build', 'watch'));
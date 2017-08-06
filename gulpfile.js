/*
1.gulp
2.gulp-less
3.gulp-sourcemaps
4.gulp-concat
5.gulp-autoprefixer
6.gulp-if
7.browser-sync
8. gulp-clean-css
*/
var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var gulp_if = require('gulp-if');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean-css');

var config = {
    paths: {
        less: './src/less/**/*.less', /*пути до файлов less*/
        html: './public/index.html'/*путь до html*/
    },
    output: {
        cssName: 'bundle.min.css',
        path: './public'
    },
    isDevelop: true
};


gulp.task('less', function () {
    return gulp.src(config.paths.less)
        .pipe(gulp_if(config.isDevelop, sourcemaps.init()))
        .pipe(gulp_if(config.isDevelop, sourcemaps.write()))
        .pipe(less())
        .pipe(concat(config.output.cssName))
        .pipe(gulp_if(!config.isDevelop, clean()))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.output.path))
        .pipe(browserSync.stream());
});

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: config.output.path
        }
    });

    gulp.watch(config.paths.less, ['less']);
    gulp.watch(config.paths.html).on('change', browserSync.reload);
});

gulp.task('default', ['less', 'server']);
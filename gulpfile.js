var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create();

require('./gulp/tasks/build-js-templates')();
require('./gulp/tasks/build-js')();

gulp.task('serve', ['styles', 'build-js'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("public/sass/*.scss", ['styles']);
    gulp.watch("./index.html").on('change', browserSync.reload);
    gulp.watch("public/js/**/*.js", ['build-js']);
    gulp.watch("dist/js/app.js").on('change', browserSync.reload);
    gulp.watch("public/templates/*.html", ['build-js']);
    gulp.watch("public/tmp/templates.js").on('change', browserSync.reload);

});

gulp.task('styles', function() {
  	return sass('public/sass', { style: 'expanded' })
    .pipe(gulp.dest('public/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve'], function() {

});
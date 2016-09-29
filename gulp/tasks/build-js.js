var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sourcemaps  = require('gulp-sourcemaps');
var ngAnnotate  = require('gulp-ng-annotate');
var concat      = require('gulp-concat');

var includes = [

    // Load main.js, config.js and then app related scripts
    'public/js/app.js',

    // The template files are concatenated into templatecache
    // Load templates preferrably before referring to them
    'public/tmp/templates.js',
    'public/js/**/*.js'
];


module.exports = function(){
    gulp.task('build-js', ['build-js-templates'], function () {
        return gulp.src(includes)
            .pipe(sourcemaps.init())
            .pipe(ngAnnotate())
            .pipe(concat('app.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./dist/js'))
            .pipe(browserSync.reload({stream:true}));
    });
};
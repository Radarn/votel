var gulp = require('gulp'),
    path = require('path'),
    templateCache   = require('gulp-angular-templatecache');


var paths = {
    templates:'./public/templates/**/*.html',
    destination:'./public/tmp/',
};

var project = 'myApp';

module.exports = function(){
    // Create a $templateCache file
    return gulp.task('build-js-templates', function(){
        return gulp.src(paths.templates)
            .pipe(templateCache({module: project}))
            .pipe(gulp.dest(paths.destination));
    });
};
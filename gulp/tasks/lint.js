'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');

gulp.task('lint', function() {
    return gulp.src('assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
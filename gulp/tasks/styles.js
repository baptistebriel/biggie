'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require("gulp-rename");
var browserSync = require('browser-sync');

gulp.task('less', function() {
    gulp.src('assets/less/layout.less')
        .pipe(less().on('error', gutil.log))    
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifycss())
        .pipe(rename("app.min.css"))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
});

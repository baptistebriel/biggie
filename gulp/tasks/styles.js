'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var rename = require("gulp-rename");
var browserSync = require('browser-sync');

gulp.task('sass', function() {
    gulp.src('assets/scss/layout.scss')
        .pipe(sass().on('error', gutil.log))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleancss())
        .pipe(rename("app.min.css"))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
        
        /* add new scss pages manually in a new task such as:
        gulp.src(['assets/scss/anoterSassPage.scss', 'assets/scss/andAnotherOne.scss'])
        .pipe(sass().on('error', handleErrors))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleancss())
        .pipe(gulp.dest('build/')) */

});

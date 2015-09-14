'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var maps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var customOpts = {
    entries: ['assets/js/main.js'],
    debug: true
};

var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app'))
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('./build/'))
    .pipe(buffer())
    .pipe(uglify())
    // .pipe(maps.init({loadMaps: true}))
    // .pipe(maps.write('./'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build'))
}

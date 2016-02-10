'use strict';

var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var changed = require('gulp-changed');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var assign = require('lodash.assign');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var customOpts = {
    entries: ['assets/js/main.js'],
    debug: true
};

var opts = assign({}, watchify.args, customOpts);
var bundler = watchify(browserify(opts).transform(babelify, {presets: ["es2015"]}));
var destination = './build';

gulp.task('js', bundle);
bundler.on('update', bundle);
bundler.on('log', gutil.log);

function bundle() {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('app'))
    .pipe(changed(destination))
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest(destination))
    .pipe(buffer())
    .pipe(uglify().on('error', gutil.log))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(destination))
}
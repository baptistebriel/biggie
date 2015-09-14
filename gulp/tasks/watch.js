'use strict';

var gulp = require('gulp');

gulp.task('watch', function() {
    gulp.watch('assets/less/**/*.less', ['less'])
    gulp.watch('assets/js/**/*.js', ['js']);
});

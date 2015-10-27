'use strict';

var gulp = require('gulp');
var history = require('connect-history-api-fallback');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', ['less', 'js'], function() {
	
	browserSync({
		notify: false,
		server: {
			baseDir: './',
			middleware: [ history() ]
		}
	});
	
	gulp.watch('assets/less/**/*.less', ['less']);
	gulp.watch('assets/js/**/*.js', ['js']);
	
	gulp.watch(['*.html', 'build/*.css', 'build/*.js'], {cwd: ''}, reload);
	
});
'use strict';

var gulp = require('gulp');
var history = require('connect-history-api-fallback');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', ['sass', 'js'], function() {
	
	browserSync({
		notify: false,
		server: {
			baseDir: './',
			middleware: [ history() ]
		}
	});
	
	gulp.watch('assets/scss/*.scss', ['sass']);
	gulp.watch('assets/js/**/*.js', ['js']);
	
	gulp.watch(['*.html', 'pug/*.pug', 'build/*.css', 'build/*.js'], {cwd: ''}, reload);
	
});

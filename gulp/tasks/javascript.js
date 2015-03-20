var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('js', function() {
    gulp.src('assets/js/*.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
	   .pipe(uglify())
	   .pipe(concat('app.min.js'))
	   .pipe(gulp.dest('build/'))
});
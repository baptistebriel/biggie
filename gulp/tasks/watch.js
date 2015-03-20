var gulp = require('gulp');

gulp.task('watch', function() {
    gulp.watch('assets/less/layout.less', ['less'])
    gulp.watch('assets/js/*.js', ['js']);
});
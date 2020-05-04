const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('default', function(cb) {
  console.log("Gulp is running!");
  
  cb();
});

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch("./*.html").on('change', browserSync.reload)
});
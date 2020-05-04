const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch("./*.html").on('change', browserSync.reload)
});

// Minify css files
gulp.task('mincss', function() {
  return gulp.src("./css/*.css")
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest("./css/css-min"))
});

// Watch for css changes
gulp.task('watch', function() {
  gulp.watch('./css/*.css', gulp.series('mincss'));
  return
});

gulp.watch('./css/*.css', function(cb) {
  console.log('seen css changes'),
  cb();
});
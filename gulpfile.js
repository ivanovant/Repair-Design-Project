const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
// sass.compiler = require('node-sass');

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

// compilate sass files
gulp.task('sass', function(cb) {
  return gulp.src('./sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('./css')),
    cb();
});


// Watch for css and sass changes
gulp.task('watch', function() {
  gulp.watch('./css/*.css', gulp.series('mincss'))
  gulp.watch('./sass/*.sass', gulp.series('sass'));
});

gulp.watch('./css/*.css', function(cb) {
  console.log('seen css changes'),
  cb();
});

gulp.watch('./sass/*.sass', function(cb) {
  console.log('seen sass changes'),
  cb();
});
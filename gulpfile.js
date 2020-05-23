const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();
// const cleanCSS = require('gulp-clean-css');
// const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minImg = require('gulp-tinypng-compress');


// Static server
function bs() {
  serveSass();
  // mincss();
  browserSync.init({
    proxy: "Repair-Design-Project",
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./sass/**/*.sass", serveSass);
  watch("./sass/**/*.scss", serveSass);
  watch("./*.html").on('change', browserSync.reload);
  watch("./js/*.js").on('change', browserSync.reload);
  watch("./**/*.php").on('change', browserSync.reload);

  // watch('./css/*.css', mincss);
};

// Minify css files
// function mincss() {
//   return src("./css/*.css")
//     .pipe(cleanCSS())
//     .pipe(rename({ suffix: '.min'}))
//     .pipe(dest("./css/css-min"))
//     .pipe(browserSync.stream());
// };

// Compressing jpg&png images
function tinypng() {
  return src("./img/clients/*.jpg")
    .pipe(minImg({
      key: 'yY89MnhWVL6TNTN5l7b4lQPtcxzw3f17',
      sigFile: 'images/.tinypng-sigs',
      log: true
    }))
    .pipe(dest("./img/minimg"));
};


// compilate sass files
function serveSass() {
  return src("./sass/**/*.sass", "./sass/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
  }))
    .pipe(dest('./css'))
    .pipe(browserSync.stream());
};




exports.serve = bs;
exports.minimg = tinypng;

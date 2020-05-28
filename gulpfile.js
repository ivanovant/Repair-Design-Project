const {src, dest, watch, series} = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minImg = require('gulp-tinypng-compress');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-minify');
const babel = require('gulp-babel');

// const webp = require('gulp-webp');
 
// function imgwebp (done) {
//         src(['img/**/**', '!img/**/**.svg'])
//         .pipe(webp())
//         .pipe(dest('imgmin/'));
//       done();
//       };
// Static server
function bs() {
  serveSass();
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



  
  // compilate sass files
  function serveSass() {
    return src("./sass/**/*.sass", "./sass/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false,
      flexbox: true
    }))
    .pipe(dest('./css'))
    .pipe(browserSync.stream());
  };

  // Minify css files
  // function mincss() {
  //   return src("./css/*.css")
  //     .pipe(cleanCSS())
  //     .pipe(rename({ suffix: '.min'}))
  //     .pipe(dest("./dist/css"))
  // };

  
  // function babeljs() {
  //     return src("js/main.js")
  //       .pipe(babel({
  //           presets: ['@babel/env']
  //       }))
  //         .pipe(dest('./js/min'))
  //       };
      
function minjs(done) {
    src("dist/js/main.js")
      .pipe(uglify())
      .pipe(dest('dist/js/'));
    done();
  };

function html(done) {
  src("./**.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./dist/"))
  done();
};


function buildJS(done) {
  src(['js/**.js', '!js/**.min.js'])
      .pipe(babel({
        presets: ['@babel/env']
    }))
      .pipe(uglify({ext:{
        min:'.js'
      }
    }))

    .pipe(dest('./dist/js/'))
  src('js/**.min.js').pipe(dest('./dist/js/'));
done();
};

function buildCSS(done) {
    src(['css/**/**.css', '!css/**.min.css'])
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(dest('./dist/css/'))
    src('css/**.min.css').pipe(dest('./dist/css/'));
  done();
};

function php(done) {
    src('**.php')
      .pipe(dest('./dist/'))
    src('phpmailer/**/**')
      .pipe(dest('dist/phpmailer/'))
  done();
};

function fonts(done) {
    src('fonts/**/**')
      .pipe(dest('./dist/fonts/'))
  done();
};

// Compressing jpg&png images
function tinypng(done) {
  src("./img/**/**.jpg")
    .pipe(minImg({
      key: 'yY89MnhWVL6TNTN5l7b4lQPtcxzw3f17',
      sigFile: 'images/.tinypng-sigs',
      log: true
    }))
    .pipe(dest("dist/img"));
  src('img/**.svg')
    .pipe(dest('dist/img/'))
    done();
  };


  exports.serve = bs;
  // exports.minimg = tinypng;
  // exports.mincss = mincss;
  // exports.web = imgwebp;
  exports.js = minjs;
  exports.build = series(buildCSS, buildJS, html, php, fonts, tinypng);
  exports.minhtml = html;
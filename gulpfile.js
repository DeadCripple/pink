'use strict';

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");
var csso = require('gulp-csso');
var server = require("browser-sync").create();
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var posthtml = require("gulp-posthtml");
var include = require('posthtml-include');
var run = require("run-sequence"); // Позволяет ассинхронно запускать таски
var del = require('del');


gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "source/js/**",
      "source/*.html"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});


// CSS
gulp.task("style", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass({
      includePaths: require("node-normalize-scss").includePaths
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


// IMAGES
gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,gif,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task('imagemin', function() {
  gulp.src('./img/**/*')
      .pipe(newer('./public/img/'))
      .pipe(imagemin([
          imageminJpegRecompress({
              method: 'smallfry'
          }),
          imageminSvgo({
              plugins: [
                  {removeDimensions: true},
                  {removeAttrs: true},
                  {removeElementsByAttr: true},
                  {removeStyleElement: true},
                  {removeViewBox: false}
              ]
          })
      ]))
      .pipe(gulp.dest('./public/img/'))
      .pipe(livereload())
});


// SVG SPRITE
gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

// Удаление лишних SVG, которые уже находятся в sprite.svg
gulp.task("clean-svg", function () {
  return del("build/img/icon-*.svg");
});

// SVG INCLUDE IN HTML
gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

// LOCAL SERVER
gulp.task("serve", function () {
  server.init({
    server: "build"
  });

  gulp.watch("source/sass/**/*.scss", ["style"]);
  gulp.watch("source/*.html", ["html:update"]);
});

gulp.task("html:copy", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function (done) {
  server.reload();
  done();
});

// Ассинхронный запуск
gulp.task("build", function (done) {
  run("clean",
    "copy",
    "style",
    "images",
    "sprite",
    "clean-svg",
    "html",
    done
  );
});

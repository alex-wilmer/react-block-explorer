var gulp = require('gulp')
  , plumber = require('gulp-plumber')
  , concat = require('gulp-concat')
  , babel = require('gulp-babel')
  , jade = require('gulp-jade')
  , stylus = require('gulp-stylus')
  , nib = require('nib')
  , scripts = ['src/components/*.jsx', 'src/controller.jsx']

gulp.task('watch', function () {
  gulp.watch('src/app.js', ['babel-server'])
  gulp.watch(scripts, ['babel-components'])
  gulp.watch('src/index.jade', ['jade'])
  gulp.watch('src/styl/index.styl', ['stylus'])
})

gulp.task('babel-server', function () {
  return gulp.src('src/app.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('dest'))
})

gulp.task('babel-components', function () {
  return gulp.src(scripts)
    .pipe(plumber())
    .pipe(concat('build.js'))
    .pipe(babel())
    .pipe(gulp.dest('dest/public/js'))
})

gulp.task('jade', function () {
  return gulp.src('src/index.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('dest/public'))
})

gulp.task('stylus', function () {
  return gulp.src('src/styl/index.styl')
    .pipe(plumber())
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('dest/public/css'))
})

gulp.task('default', [
  'watch'
, 'babel-server'
, 'babel-components'
, 'jade'
, 'stylus' ])

var gulp = require('gulp')
  , concat = require('gulp-concat')
  , babel = require('gulp-babel')
  , jade = require('gulp-jade')
  , stylus = require('gulp-stylus')
  , nib = require('nib')

gulp.task('scripts', function () {
  return gulp.src('src/app.js')
    .pipe(babel())
    .pipe(gulp.dest('dest'))
})

gulp.task('components', function () {
  return gulp.src('src/components/*.jsx')
    .pipe(concat('components.js'))
    .pipe(babel())
    .pipe(gulp.dest('dest/public/js'))
})

gulp.task('jade', function () {
  return gulp.src('src/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('dest/public'))
})

gulp.task('stylus', function () {
  return gulp.src('src/styl/index.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('dest/public/css'))
})

gulp.task('watch', function () {
  gulp.watch('src/app.js', ['scripts'])
  gulp.watch('src/components/*.jsx', ['components'])
  gulp.watch('src/index.jade', ['jade'])
  gulp.watch('src/styl/index.styl', ['stylus'])
})

gulp.task('default', ['watch', 'scripts', 'components', 'jade', 'stylus'])

var gulp = require('gulp')
  , concat = require('gulp-concat')
  , babel = require('gulp-babel')
  , jade = require('gulp-jade')

gulp.task('babel', function () {
  return gulp.src('src/components/*.jsx')
    .pipe(babel())
    .pipe(concat('components.js'))
    .pipe(gulp.dest('dest/js'))
})

gulp.task('jade', function () {
  return gulp.src('src/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('dest'))
})

gulp.task('watch', function () {
  gulp.watch('src/components/*.jsx', ['babel'])
  gulp.watch('src/index.jade', ['jade'])
})

gulp.task('default', ['watch', 'babel', 'jade'])

var gulp = require('gulp')
  , concat = require('gulp-concat')
  , babel = require('gulp-babel')
  , jade = require('gulp-jade')

gulp.task('scripts', function () {
  return gulp.src('src/app.js')
    .pipe(babel())
    .pipe(gulp.dest('dest'))
})

gulp.task('components', function () {
  return gulp.src('src/components/*.jsx')
    .pipe(babel())
    .pipe(concat('components.js'))
    .pipe(gulp.dest('dest/public/js'))
})

gulp.task('jade', function () {
  return gulp.src('src/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('dest/public'))
})

gulp.task('watch', function () {
  gulp.watch('src/app.js', ['scripts'])
  gulp.watch('src/components/*.jsx', ['components'])
  gulp.watch('src/index.jade', ['jade'])
})

gulp.task('default', ['watch', 'scripts', 'components', 'jade'])

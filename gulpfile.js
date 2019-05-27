'use strict';
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass');




gulp.task('sass', async function() {
    gulp.src('./app/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer(['last 2 version']))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('minify', async function () {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('watch', [ 'build' ], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch(('js/*.js'), ['minify']);
});

gulp.task('build', ['sass',  'minify']);

gulp.task('default', ['watch']);
'use strict';
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass');




gulp.task('sass', async function() {
    gulp.src('./app/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(autoprefixer(['last 2 version']))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('minify', async function () {
    gulp.src('app/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('main.js', {newLine: ';'}))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
});


gulp.task('watch', [ 'build' ], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch(('app/js/*.js'), ['minify']);
    gulp.watch('app/images/**/*.*', ['images']);
});

gulp.task('build', ['sass',  'minify', 'images']);

gulp.task('default', ['build', 'watch', 'images']);
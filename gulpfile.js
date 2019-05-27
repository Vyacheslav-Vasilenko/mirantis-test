var gulp = require('gulp'),
    browsersync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    rename = require('gulp-rename'),
    del = require('del'),
    sass = require('gulp-sass'),
    plumber = require("gulp-plumber"),
    notify = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css');

/////////////////////////////////
/////////// scss
/////////////////////////////////

gulp.task('styles', function () {
    return gulp.src('dev/sass/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", notify.onError(function (error) {
            return "Something happened: " + error.message;
        }))
        .pipe(autoprefixer(['last 2 version']))
        // .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(''))
});


/////////////////////////////////
/////////// scripts
/////////////////////////////////

gulp.task('scripts', function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.min.js',
        'js/vendor/stickyscrollbox.js',
        'dev/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

gulp.task('jquery', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js'
    ])
        .pipe(gulp.dest('js'))
});


/////////////////////////////////
/////////// images
/////////////////////////////////

gulp.task('images', function() {
    return gulp.src(['dev/images/**/*.*'])
        .pipe(gulp.dest('images'))
        .pipe(browsersync.reload({
            stream: true
        }));
});

/////////////////////////////////
/////////// markup
/////////////////////////////////

gulp.task('markup', function() {
    return gulp.src('*.html')
        .pipe(browsersync.reload({
            stream: true
        }));
});


/////////////////////////////////
/////////// watch
/////////////////////////////////

gulp.task('watch', [ 'build' ], function() {
    gulp.watch('dev/sass/**/*.scss', ['styles']);
    gulp.watch('*.html', ['markup']);
    gulp.watch('dev/assets/images/**/*.*', ['images']);
    gulp.watch(['dev/js/**/*.js'], ['scripts']);
});

/////////////////////////////////
/////////// clean
/////////////////////////////////

gulp.task('clean', function () {
    return del.sync(['js', 'css']);
});

/////////////////////////////////
/////////// build
/////////////////////////////////

gulp.task('build', ['styles', 'images', 'jquery', 'scripts']);


/////////////////////////////////
/////////// default
/////////////////////////////////
gulp.task('default', ['watch']);

// importing gulp package
const gulp = require('gulp');

// gulp plugin for minifying images
const imagemin = require('gulp-imagemin');

// gulp plugin for selecting dir inside dir
const sourcemaps = require('gulp-sourcemaps');

// gulp plugin for concatenation of files
const concat = require('gulp-concat');

// gulp plugin
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

// gulp plugin uglify
const uglify = require('gulp-uglify');

// destructered gulp object
const { src, series, parallel, dest, watch } = require('gulp');
const cssnano = require('cssnano');

// declared image path variable
const imgPath = 'images/**/*';

// copies HTML and distributed to final folder
const copyHTML = () => src('*.html').pipe(gulp.dest('final'));

// copies and minimises size of the images
// const imgTasks = () => src('images/*').pipe(imagemin()).pipe(gulp.dest('final/images'));
const imgTask = () => {
    return src(imgPath)
        .pipe(sourcemaps.init())
        .pipe(imagemin())
        .pipe(dest('final/images'));
}

// minifies (uglify) SCSS
const sassTask = () => {
    return gulp.src('styles/**/*.scss')
    //   .pipe(sourcemaps.init())
      .pipe(sass())
    //   .pipe(sourcemaps.write())
      .pipe(gulp.dest('final/assets/css'));
};

const cssTask = () => {
    return gulp.src('final/assets/css/main.css')
    .pipe(cssnano())
    .pipe(gulp.dest('final/assets/css'));
}

// minifies (uglify) CSS
const jsTask = () => {
    return gulp.src('script/*.js')
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(dest('final/assets/js'));
};




exports.jsTask = jsTask;
exports.cssTask = cssTask;
exports.sassTask = sassTask;
exports.imgTask = imgTask;
exports.copyHTML = copyHTML;
// importing gulp package
const gulp = require('gulp');

// gulp plugin for minifying images
const imagemin = require('gulp-imagemin');

// gulp plugin for selecting dir inside dir
const sourcemaps = require('gulp-sourcemaps');

// gulp plugin for concatenation of files
const concat = require('gulp-concat');

// gulp sass
const sass = require('gulp-sass');

// destructered gulp object
const { src, series, parallel, dest, watch } = require('gulp');

// declared image path variable
const imgPath = 'images/**/*';

// copies and minimises size of the images
// const imgTasks = () => src('images/*').pipe(imagemin()).pipe(gulp.dest('final/images'));
const imgTask = () => {
    return src(imgPath)
        .pipe(sourcemaps.init())
        .pipe(imagemin())
        .pipe(dest('dist/images'));
};

gulp.task('imgTask', imgTask);

gulp.task('watch', () => {
  gulp.watch('imgTask', imgTask);
});

// minifies (uglify) SCSS
const sassTask = () => {
    return gulp.src('styles/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/css'));
};

gulp.task("default",gulp.series("imgTask","watch"));


exports.sassTask = sassTask;
exports.imgTask = imgTask;
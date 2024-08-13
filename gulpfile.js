import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify-es';
import synchronizer from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import clean from 'gulp-clean';

const browserSync = synchronizer.create();
const scss = gulpSass(sass);
const { src, dest, watch, parallel, series } = gulp;

export const styles = () =>
  src('./app/scss/**/*.scss')
    .pipe(autoprefixer())
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());

export const scripts = () =>
  src(['app/js/**/*.js', '!app/js/index.min.js'])
    .pipe(concat('index.min.js'))
    .pipe(uglify.default())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());

export const watcher = () => {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/index.min.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
};

export const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });
};

const cleanDist = () => src('dist').pipe(clean());
const buildDist = () =>
  src(['app/css/style.min.css', 'app/js/index.min.js', 'app/**/*.html'], {
    base: 'app',
  }).pipe(dest('dist'));

export const build = series(cleanDist, buildDist);

export default parallel(styles, scripts, browsersync, watcher);

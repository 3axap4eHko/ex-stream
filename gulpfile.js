'use strict';

const sourceDir = './src';
const buildDir = './build';

const Del = require('del');
const Gulp = require('gulp');
const Babel = require('gulp-babel');
const Sourcemaps = require('gulp-sourcemaps');
const ESLlint = require('gulp-eslint');
const Export = require('gulp-export');

Gulp.task('clean', cb => {
  return Del([buildDir], cb);
});

Gulp.task('export', () => {
  return Gulp.src([`${sourceDir}/**/*.js`, `!${sourceDir}/index.js`])
    .pipe(Export({context: './src'}));
});

Gulp.task('js-compile', ['clean', 'export'], function() {
  return Gulp.src([`${sourceDir}/**/*.js`])
    .pipe(ESLlint())
    .pipe(ESLlint.format())
    .pipe(ESLlint.failAfterError())
    .pipe(Sourcemaps.init())
    .pipe(Babel())
    .pipe(Sourcemaps.write('.'))
    .pipe(Gulp.dest(buildDir));
});

Gulp.task('files-copy', ['clean'], function() {
  return Gulp.src(['./package.json', './README.md'])
    .pipe(Gulp.dest(buildDir));
});

Gulp.task('default', ['clean', 'export', 'js-compile', 'files-copy']);
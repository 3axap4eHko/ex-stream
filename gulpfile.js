const Del = require('del');
const Gulp = require('gulp');
const Babel = require('gulp-babel');
const Sourcemaps = require('gulp-sourcemaps');
const ESLlint = require('gulp-eslint');
const Export = require('gulp-export');

const sourceDir = './src';
const buildDir = './build';

Gulp.task('clean', cb => {
  return Del([buildDir], cb);
});

Gulp.task('js-compile', ['clean'], function() {
  return Gulp.src([`${sourceDir}/**/*.js`])
    .pipe(ESLlint())
    .pipe(ESLlint.format())
    .pipe(ESLlint.failAfterError())
    .pipe(Export({context: './src'}))
    .pipe(Sourcemaps.init())
    .pipe(Babel())
    .pipe(Sourcemaps.write('.'))
    .pipe(Gulp.dest(buildDir));
});

Gulp.task('files-copy', ['clean'], function() {
  return Gulp.src(['./package.json', './README.md'])
    .pipe(Gulp.dest(buildDir));
});

Gulp.task('default', ['clean', 'js-compile', 'files-copy']);
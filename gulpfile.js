
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const react = require('gulp-react');

var files = ['src/**/*.js', 'server.js', 'gulpfile.js',
  './models/**/*.js', './lib/**/*.js', './routes/**/*.js'];
var testFiles = ['./test/**/*.js'];

var path = {
  HTML: 'src/index.html',
  ALL: ['src/**/*.js', 'src/index.html'],
  JS: ['src/**/*.js']
  DEST_SRC: 'src',
  DEST_BUILD: ' build',
  DEST: 'dist'
};

gulp.task('transform', () => {
  return gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('lint', () => {
  return gulp.src(files, testFiles)
    .pipe(eslint({
      'env': {
        'es6': true,
        'browser': true
      },
      'ecmaFeatures': {
        'sourceType': 'module'
      },
      'parserOptions': {
        'sourceType': 'module',
        'ecmaFeatures': {
          'jsx': true,
          'experimentalObjectRestSpread': true
        }
      },
      'rules': {
        'no-unused-vars': 0
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('babel', () => {
  .pipe(sourcemaps.init())
  .pipe(babel({
    only: [
      'src/components',
    ],
    compact: false
  }))
  .pipe(sourcemaps.write('./build'))
});

gulp.task('watch', () => {
  gulp.watch(files, testFiles, ['default']);
});

gulp.task('default', ['lint']);

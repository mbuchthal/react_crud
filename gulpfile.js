
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const sourcemaps = require('gulp-sourcemaps');

var files = ['src/**/*.js', 'server.js', 'gulpfile.js',
  './models/**/*.js', './lib/**/*.js', './routes/**/*.js'];
var testFiles = ['./test/**/*.js'];

var path = {
  HTML: 'src/index.html',
  ALL: ['src/**/*.js', 'src/index.html'],
  JS: ['src/**/*.js'],
  DEST_SRC: 'src',
  DEST_BUILD: ' build',
  DEST: 'dist'
};

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

gulp.task('build:dev', () => {
  return webpack({
    devtool: 'source-map',
    entry: [
      __dirname + '/src/index.js'
    ],
    output: {
      filename: 'bundle.js'
    },
    // resolve: {
    //   modulesDirectories: ['node_modules', 'src'],
    //   extensions: ['', '.js']
    // },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['babel?presets[]=react,presets[]=es2015']
        }
      ]
    }
  })
  .pipe(gulp.dest('build/'));
});

gulp.task('watch', () => {
  gulp.watch(files, testFiles, ['default']);
});

gulp.task('default', ['lint']);

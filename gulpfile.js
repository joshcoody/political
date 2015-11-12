var gulp = require('gulp');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var clip = require('gulp-clip-empty-files');
var nunjucks = require('gulp-nunjucks-html');
var minifyHTML = require('gulp-minify-html');
var minifyInline = require('gulp-minify-inline');
var browserify = require('browserify');
var babel = require("gulp-babel");
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var files = {
  'scss': {
    'source': 'source/scss/*.scss',
    'destination': './source/css'
  },
  'css': {
    'source': ['source/css/*.css', '!source/css/inline.css'],
    'destination': './app/css/'
  },
  'browserify': {
    'source': 'source/js/main.js',
    'destination': './source/js'
  },
  'babel': {
    'source': 'source/js/leadingPolls.babel',
    'destination': './source/js'
  },
  'js': {
    'source': ['source/js/standalone-framework.js','source/js/highcharts.js', 'source/js/modules/exporting.js','source/js/fetch-promise.js','source/js/app.js'],
    'destination': './app/js'
  },
  'images': {
    'source': 'source/images/*',
    'destination': './app/images'
  },
  'html': {
    'source': 'source/templates/index.html',
    'destination': './app/'
  },
  'templates': {
    'source': 'source/templates/*.html'
  }
};

gulp.task('scss', function() {
  return gulp.src(files.scss.source)
    .pipe(newer(files.scss.destination))
    .pipe(clip())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'expanded',
      includePaths: ['//atlas.adinfocenter.com/Departments/UIE/Mixins']
    }))
    .pipe(autoprefixer({
      browsers: ['last 6 versions', 'ie 8'],
      cascade: false
    }))
    .pipe(gulp.dest(files.scss.destination));
});

gulp.task('css', ['scss'], function() {
  return gulp.src(files.css.source)
    .pipe(newer(files.css.destination))
    .pipe(clip())
    .pipe(concat('main.css'))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(files.css.destination))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('images', function() {
  return gulp.src(files.images.source)
    .pipe(newer(files.images.destination))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(files.images.destination));
});

gulp.task('html', function() {
  return gulp.src(files.html.source)
    .pipe(nunjucks({
      searchPaths: ['./source/templates', './source']
    }))
    .pipe(minifyInline({js: {mangle: false}}))
    .pipe(minifyHTML())
    .pipe(gulp.dest(files.html.destination))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('babel', function() {
  return gulp.src(files.babel.source)
    .pipe(babel())
    .pipe(rename('leadingPolls.js'))
    .pipe(gulp.dest(files.babel.destination));
});

gulp.task('browserify', function() {
  return browserify(files.browserify.source).bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(files.browserify.destination));
});

gulp.task('js', ['babel', 'browserify'], function() {
  return gulp.src(files.js.source)
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(files.js.destination))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(files.browserify.source, ['js']);
  gulp.watch(files.scss.source, ['css']);
  gulp.watch(files.images.source, ['images']);
  gulp.watch(files.templates.source, ['html']);
});

gulp.task('serve', function() {
  browserSync({
    server: './app',
    open: false
  });
});

gulp.task('default', ['css', 'images', 'html', 'js', 'watch', 'serve']);

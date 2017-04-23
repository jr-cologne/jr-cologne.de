var gulp          = require('gulp');
var sass          = require('gulp-sass');
var browserSync   = require('browser-sync').create();
var useref        = require('gulp-useref');
var uglify        = require('gulp-uglify');
var gulpIf        = require('gulp-if');
var cssnano       = require('gulp-cssnano');
var imagemin      = require('gulp-imagemin');
var cache         = require('gulp-cache');
var cp            = require('child_process');
var gutil         = require('gulp-util');
var runSequence   = require('run-sequence');
var run           = require('gulp-run');
var rename        = require('gulp-rename');
var autoprefixer  = require('gulp-autoprefixer');

var sass_path = '_app/assets/sass';
var css_path = '_site/assets/css';

var config = {
  drafts:     !!gutil.env.drafts
};

var jekyllDir = '';

gulp.task('watch', function() {
  gulp.watch([sass_path + '/*.sass', sass_path + '/sites-sections/*.sass', sass_path + '/modules/*.sass'], ['sass-watch']);

  gulp.watch(['_config.yml'], ['jekyll-watch']);

  gulp.watch('_app/assets/js/*.js', ['useref-watch']);

  gulp.watch('_posts/**/*.+(md|markdown|MD)', ['jekyll-watch']);

  if (config.drafts) {
    gulp.watch('_drafts/*.+(md|markdown|MD)', ['jekyll-watch']);
  }

  gulp.watch(['*.html', '*.php', '_layouts/*.html', '_includes/*.html', '!_site/**/*.*'], ['jekyll-watch']);

  gulp.watch('favicon.ico', ['jekyll-watch']);
});

gulp.task('sass', function() {
  return gulp.src([sass_path + '/style.sass', sass_path + '/sites-sections/legal.sass', sass_path + '/sites-sections/contact.sass'])
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ['last 3 versions', '> 0.5%'] }))
    .pipe(cssnano())
    .pipe(gulp.dest(css_path))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: '_site',
      port: 3000
    },
    browser: 'chrome',
    open: false
  })
});

gulp.task('useref', function() {
  return gulp.src(['_site/*.html', '_site/*.php'])
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('_site'))
})

gulp.task('images', function () {
  return gulp.src(['_app/assets/img/original/**/*.+(png|jpg|gif|svg)'])
    .pipe(cache(imagemin([
      imagemin.gifsicle({
        interlaced: true,
        optimizationLevel: 3,
      }),
      imagemin.jpegtran({
        progressive: true,
        arithmetic: true,
      }),
      imagemin.optipng({
        optimizationLevel: 5,
      }),
      imagemin.svgo({plugins: [{
        removeViewBox: true
      }]})
    ])))
    .pipe(gulp.dest('_app/assets/img/min/'))
    .pipe(gulp.dest('_site/assets/img/min/'))
})

gulp.task('php', function () {
  return gulp.src('_app/assets/php/*.php')
    .pipe(gulp.dest('_site/assets/php'))
})

gulp.task('jekyll', function() {
  var shellCommand = 'jekyll build';
  if (config.drafts) { shellCommand += ' --drafts'; };

  return gulp.src(jekyllDir)
    .pipe(run(shellCommand))
    .on('error', gutil.log);
});

gulp.task('build', function(cb) {
  runSequence('jekyll', 'php', 'images', 'sass', 'useref', cb);
});

gulp.task('sass-watch', ['sass'], function(cb) {
  runSequence('jekyll');
  browserSync.reload();
  cb();
});

gulp.task('jekyll-watch', ['jekyll'], function(cb) {
  browserSync.reload();
  cb();
});

gulp.task('useref-watch', function(cb) {
  runSequence('jekyll', 'useref');
  browserSync.reload();
  cb();
});

gulp.task('default', ['build'], function() {
  runSequence(['browserSync', 'watch']);
});

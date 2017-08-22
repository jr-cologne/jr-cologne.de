var gulp          = require('gulp');
var sass          = require('gulp-sass');
var browserSync   = require('browser-sync').create();
var uglify        = require('gulp-uglify');
var cssnano       = require('gulp-cssnano');
var gutil         = require('gulp-util');
var runSequence   = require('run-sequence');
var run           = require('gulp-run');
var autoprefixer  = require('gulp-autoprefixer');

var css_path = '_app/assets/css';
var sass_path = '_app/assets/sass';
var site_css_path = '_site/_app/assets/css';

var config = {
  drafts:     !!gutil.env.drafts
};

var jekyllDir = '';

gulp.task('watch', function() {
  gulp.watch(css_path + '/*.css', ['css']);

  gulp.watch([sass_path + '/*.sass', sass_path + '/pages/*.sass', sass_path + '/partials/*.sass', sass_path + '/modules/*.sass', sass_path + '/media/*.sass', sass_path + '/helpers/*.sass', sass_path + '/base/*.sass'], ['sass-watch']);

  gulp.watch(['_config.yml'], ['jekyll-watch']);

  gulp.watch('_app/assets/js/*.js', ['js']);

  gulp.watch('_posts/**/*.+(md|markdown|MD)', ['jekyll-watch']);

  if (config.drafts) {
    gulp.watch('_drafts/*.+(md|markdown|MD)', ['jekyll-watch']);
  }

  gulp.watch(['*.html', '*.php', '_app/php/*.php', '_app/php/**/*.php', '_layouts/*.html', '_includes/*.html', 'portfolio/*.html', 'tags/*.html', '_posts/blog/*.html', 'resources/*.html', '!_site/**/*.*'], ['jekyll-watch']);

  gulp.watch('favicon.ico', ['jekyll-watch']);
});

gulp.task('css', function() {
  return gulp.src(css_path + '/*.css')
    .pipe(autoprefixer({ browsers: ['last 3 versions', '> 0.5%'] }))
    .pipe(cssnano())
    .pipe(gulp.dest(site_css_path))
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('sass', function() {
  return gulp.src([sass_path + '/pages/*.sass', sass_path + '/all.sass'])
    .pipe(sass())
    .pipe(autoprefixer({ browsers: ['last 3 versions', '> 0.5%'] }))
    .pipe(cssnano())
    .pipe(gulp.dest(site_css_path))
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

gulp.task('js', function () {
  return gulp.src(['_app/assets/js/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('_site/_app/assets/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
})

gulp.task('images', function () {
  return gulp.src(['_app/assets/img/min/**/*.+(png|jpg|gif|svg)'])
    .pipe(gulp.dest('_site/_app/assets/img'))
})

gulp.task('php', function () {
  return gulp.src(['_app/**/*.php'])
    .pipe(gulp.dest('_site/_app/'))
})

gulp.task('jekyll', function() {
  var shellCommand = 'jekyll build';
  if (config.drafts) { shellCommand += ' --drafts'; };

  return gulp.src(jekyllDir)
    .pipe(run(shellCommand))
    .on('error', gutil.log);
});

gulp.task('build', function(cb) {
  runSequence('jekyll', 'php', 'images', 'sass', 'css', 'js', cb);
});

gulp.task('sass-watch', ['sass'], function(cb) {
  runSequence('jekyll');
  browserSync.reload();
  cb();
});

gulp.task('jekyll-watch', ['jekyll', 'php'], function(cb) {
  browserSync.reload();
  cb();
});

gulp.task('default', ['build'], function() {
  runSequence(['browserSync', 'watch']);
});

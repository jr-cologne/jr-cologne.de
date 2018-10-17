/**
 * A simple Gulp 4 Starter Kit for modern web development.
 *
 * @package @jr-cologne/create-gulp-starter-kit
 * @author JR Cologne <kontakt@jr-cologne.de>
 * @copyright 2018 JR Cologne
 * @license https://github.com/jr-cologne/gulp-starter-kit/blob/master/LICENSE MIT
 * @version v0.1.2-alpha
 * @link https://github.com/jr-cologne/gulp-starter-kit GitHub Repository
 * @link https://www.npmjs.com/package/@jr-cologne/create-gulp-starter-kit npm package site
 *
 * ________________________________________________________________________________
 *
 * gulpfile.js
 *
 * The gulp configuration file.
 *
 * Modified for use in jr-cologne.de.
 *
 */

const gulp                      = require('gulp'),
      sourcemaps                = require('gulp-sourcemaps'),
      plumber                   = require('gulp-plumber'),
      sass                      = require('gulp-sass'),
      autoprefixer              = require('gulp-autoprefixer'),
      cssnano                   = require('gulp-cssnano'),
      uglify                    = require('gulp-uglify'),
      browserSync               = require('browser-sync').create(),
      { exec }                  = require('child_process'),

      src_folder                = './',
      src_assets_folder         = src_folder + '_app/assets/',
      dist_folder               = './_site/',
      dist_assets_folder        = dist_folder + '_app/assets/',
      node_modules_folder       = './node_modules/',
      dist_node_modules_folder  = dist_folder + 'node_modules/',

      node_dependencies         = [
        'normalize.css',
        'jquery',
        'cookieconsent',
        'outdatedbrowser'
      ];

gulp.task('jekyll', () => {
  return exec('jekyll build', {}, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
});

gulp.task('php', () => {
  return gulp.src([ src_folder + '_app/**/*.php' ])
    .pipe(gulp.dest(dist_folder + '_app'));
});

gulp.task('images', () => {
  return gulp.src([ src_assets_folder + 'img/min/**/*.+(png|jpg|gif|svg|ico)' ])
    .pipe(gulp.dest(dist_assets_folder + 'img'));
});

gulp.task('sass', () => {
  return gulp.src([ src_assets_folder + 'sass/pages/*.sass', src_assets_folder + 'sass/all.sass' ])
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: [ 'last 3 versions', '> 0.5%' ]
      }))
      .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_assets_folder + 'css'))
    .pipe(browserSync.stream());
});

gulp.task('css', () => {
  return gulp.src([ node_modules_folder + 'normalize.css/normalize.css' ])
    .pipe(autoprefixer({ browsers: ['last 3 versions', '> 0.5%'] }))
    .pipe(cssnano())
    .pipe(gulp.dest(node_modules_folder + 'normalize.css'));
});

gulp.task('js', () => {
  return gulp.src([ src_assets_folder + 'js/**/*.js' ])
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_assets_folder + 'js'))
    .pipe(browserSync.stream());
});

gulp.task('service-worker', () => {
  return gulp.src([ src_folder + 'service-worker.js' ])
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist_folder))
    .pipe(browserSync.stream());
});

gulp.task('vendor-assets', () => {
  gulp.src([ src_assets_folder + 'vendor/highlightjs/**/*.css' ], { 'base': src_assets_folder + 'vendor' })
    .pipe(autoprefixer({ browsers: ['last 3 versions', '> 0.5%'] }))
    .pipe(cssnano())
    .pipe(gulp.dest(dist_assets_folder + 'vendor'));
  gulp.src([ src_assets_folder + 'vendor/highlightjs/**/*.js' ], { 'base': src_assets_folder + 'vendor' })
    .pipe(uglify())
    .pipe(gulp.dest(dist_assets_folder + 'vendor'));
  return gulp.src([ src_assets_folder + 'vendor/highlightjs/**/*', src_assets_folder + 'vendor/vanilla-lazyload/**/*' ], { 'base': src_assets_folder + 'vendor' })
    .pipe(gulp.dest(dist_assets_folder + 'vendor'));
});

gulp.task('vendor', () => {
  if (node_dependencies.length === 0) {
    return new Promise((resolve) => {
      console.log("No dependencies specified");
      resolve();
    });
  }

  return gulp.src(node_dependencies.map(dependency => node_modules_folder + dependency + '/**/*.*'), { base: node_modules_folder })
    .pipe(gulp.dest(dist_node_modules_folder))
    .pipe(browserSync.stream());
});

gulp.task('build', gulp.series('jekyll', 'php', 'images', 'sass', 'css', 'js', 'service-worker', 'vendor-assets', 'vendor'));

gulp.task('serve', () => {
  return browserSync.init({
    server: {
      baseDir: [ '_site' ],
      port: 3000
    },
    open: false
  });
});

gulp.task('watch', () => {
  let watch = [
    src_folder + '_config.yml',
    src_folder + '_posts/**/*.+(md|markdown|MD)',
    src_folder + '*.html',
    src_folder + '*.php',
    src_folder + '_app/php/**/*.php',
    src_folder + '_layouts/*.html',
    src_folder + '_includes/*.html',
    src_folder + 'portfolio/*.html',
    src_folder + 'tags/*.html',
    src_folder + '_posts/blog/*.html',
    src_folder + 'resources/*.html',
    src_folder + 'errors/*.html',
    src_folder + '.htaccess',
    src_folder + 'manifest.json',
    src_folder + 'browserconfig.xml',
    src_folder + 'service-worker.js',
    src_assets_folder + 'sass/**/*.sass',
    src_assets_folder + 'js/**/*.js',
    '!' + dist_folder + '**/*.*',
    '!' + node_modules_folder + '**/*.*'
  ];

  node_dependencies.forEach(dependency => {
    watch.push(node_modules_folder + dependency + '/**/*.*');
  });

  gulp.watch(watch, gulp.series('build')).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')));

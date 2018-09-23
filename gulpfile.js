'use strict';

const angularFilesort = require('gulp-angular-filesort');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const bs = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const del = require('del');
const deleteEmpty = require('delete-empty');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const inject = require('gulp-inject');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const saveLicense = require('uglify-save-license');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');

const paths = {
  app: 'app/',
  dist: '.dist/',
  html: ['app/**/*.html'],
  scripts: ['app/**/*.js', '**/**/!*.spec.js'],
  stylesBase: ['app/app.scss'],
  styles: ['app/views/**/*.scss', 'app/components/**/*.scss'],
  other: ['assets/**'],
  vendorScripts: [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
  ],
  vendorStyles: [],
};

/**
 * Initalizes the Browsersync server
 * @param {function} done - A callback function
 * @returns {void}
 */
function startServer(done) {
  bs.init({
    server: {
      baseDir: paths.dist,
    },
  });
  done();
}

/**
 * Refreshes all browsers
 * @param {function} done - A callback function
 * @returns {void}
 */
function reloadServer(done) {
  bs.reload();
  done();
}

/**
 * Notifies all browsers that something is compiling
 * @param {function} done - A callback function
 * @returns {void}
 */
function notifyServer(done) {
  bs.notify('Compiling, please wait!');
  done();
}

/**
 * Deletes everything in the output directory
 * @returns {Promise<string[]>}
 */
const clean = () => del([paths.dist]);

/**
 * Deletes empty folders in the output directory
 * @returns {void}
 */
const removeEmpty = () => deleteEmpty(paths.dist);

/**
 * Compiles and moves `paths.html` to output directory
 */
const html = {
  prod: () => gulp.src(paths.html)
    .pipe(plumber())
    .pipe(htmlmin({ // minify HTML
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
    }))
    .pipe(gulp.dest(paths.dist)),
  dev: () => gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist)),
};

/**
 * Bundles, compiles and moves `paths.scripts` to output directory
 */
const scripts = {
  prod: () => gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(angularFilesort()) // sort files into an order angular "likes"
    .pipe(sourcemaps.init()) // enable sourcemaps
    .pipe(babel({ // transpile using babel
      presets: ['@babel/env'], // use preset environment
    }))
    .pipe(concat('scripts.js')) // concat into one file
    .pipe(terser({mangle: false})) // minify
    .pipe(sourcemaps.write('.')) // write sourcemap files
    .pipe(gulp.dest(paths.dist)),
  dev: () => gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(angularFilesort())
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist)),
};

/**
 * Bundles, compiles and moves styles defined in `paths.vendorStyles` and
 * `paths.styles` to output directory
 */
const styles = {
  prod: () => {
    const injectOptions = {
      transform: function(filePath) {
        // remove app/ prefix
        filePath = filePath.replace(paths.app + 'app/', '');
        // allow import of .css files by stripping the file extension
        filePath = filePath.replace('.css', '');
        return `@import "${filePath}";`;
      },
      starttag: '/* start-injector */',
      endtag: '/* end-injector */',
      addRootSlash: false,
    };
    const toInject = gulp.src([...paths.vendorStyles, ...paths.styles]);

    /* the order here is important. we want to OVERWRITE our vendor rules with
       our defined styles, not the other way around
    */
    return gulp.src(paths.stylesBase)
      .pipe(plumber())
      .pipe(inject(toInject, injectOptions)) // inject vendor and user sass
      .pipe(sourcemaps.init())
      .pipe(sass({ // sass -> css
        includePaths: ['node_modules'],
      }))
      .pipe(concat('style.css')) // put everything in one file
      .pipe(autoprefixer()) // add vendor prefixes
      .pipe(cssnano()) // minify
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dist));
  },
  dev: () => {
    const injectOptions = {
      transform: function(filePath) {
        filePath = filePath.replace(paths.app + '/app/', '');
        filePath = filePath.replace('.css', '');
        return `@import "${filePath}";`;
      },
      starttag: '/* start-injector */',
      endtag: '/* end-injector */',
      addRootSlash: false,
    };
    const toInject = gulp.src([...paths.vendorStyles, ...paths.styles]);

    return gulp.src(paths.stylesBase)
      .pipe(plumber())
      .pipe(inject(toInject, injectOptions))
      .pipe(sourcemaps.init())
      .pipe(sass({
        includePaths: ['node_modules'],
        precision: 8,
      }))
      .pipe(concat('style.css'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dist))
      .pipe(bs.stream()); // let browsersync know that we updated the styles
  },
};

/**
 * Bundles `paths.vendorScripts` and moves to output directory
 */
const vendorScripts = {
  prod: () => gulp.src(paths.vendorScripts)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('vendors.js'))
    .pipe(terser({
      mangle: false,
      output: {
        comments: saveLicense, // keep vendor licenses
      },
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist)),
  dev: () => gulp.src(paths.vendorScripts)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('vendors.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist)),
};

/**
 * Copies files in `paths.other` to dist directly
 * @returns {void}
 */
const other = () => gulp.src(paths.other, {cwd: paths.app + '**'})
  .pipe(gulp.dest(paths.dist));

/**
 * Cleans .dist/ folder, then builds the application
 */
const build = {
  prod: (done) => gulp.series(
    clean,
    gulp.parallel(html.prod, scripts.prod, styles.prod, vendorScripts.prod, other),
    removeEmpty
  )(done),
  dev: (done) => gulp.series(
    clean,
    gulp.parallel(html.dev, scripts.dev, styles.dev, vendorScripts.dev, other),
    removeEmpty
  )(done),
};

const watch = () => {
  gulp.watch(paths.html, gulp.series(notifyServer, html.dev, reloadServer));
  gulp.watch('app/**/{*.js|*.ts}', gulp.series(notifyServer, scripts.dev, reloadServer));
  gulp.watch('app/**/{*.scss|*.css}', gulp.series(notifyServer, styles.dev, (done) => {
    bs.notify('CSS updated!');
    done();
  }));
  gulp.watch(paths.other, gulp.series(notifyServer, other));
};

const serve = gulp.series(build.dev, startServer, watch);

module.exports = {
  serve,
  'build:dev': build.dev,
  'build:prod': build.prod,
  'start-server': startServer,
  'scripts': scripts.dev,
  'default': serve,
};

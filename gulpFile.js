const { parallel, src, dest } = require("gulp"),
  babel = require("gulp-babel"),
  minify = require("gulp-babel-minify"),
  pump = require("pump"),
  autoprefixer = require('gulp-autoprefixer'),
  csso = require('gulp-csso'),
  sass = require("gulp-sass"),
  baseJs = "./src/slicKollage.js",
  baseCss = "./src/slicKollage.scss",
  distUrl = "./dist",
  babelOptions = {
    presets: ["@babel/env"]
  },
  AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

const script = function(cb) {
  pump([
    src([baseJs]),
    babel(babelOptions),
    dest(distUrl)
  ], cb);
};

const scriptMin = function (cb) {
  pump([
    src(baseJs),
    babel(babelOptions),
    minify({
      mangle: {
        keepClassName: true
      }
    }),
    dest(distUrl)
  ], cb);
};


const sassify = function (cb) {
  pump([
    src(baseCss),
    sass().on("error", sass.logError),
    dest(distUrl)
  ], cb);
};
const styles = function() {
  return src('./src/sass/styles.scss')
    // Compile SASS files
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    }))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(dest('./dist/css'));
};

const sassifyMin = function (cb) {
  pump([
    src(baseCss),
    sass().on("error", sass.logError),
    dest(distUrl)
  ], cb);
};

// Default Build task
exports.default = parallel(script, sassify);
exports.minify = parallel(scriptMin, sassifyMin);
exports.dist = parallel(script, scriptMin, sassify, sassifyMin);

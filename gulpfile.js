/*
  modules
*/

const {src, dest, watch, series, parallel} = require('gulp')
const stylus = require('gulp-stylus')
//const nib = require('nib')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const cleanCSS = require('gulp-clean-css')

/*
  css
*/

const css = (cb) => {
  return src([
    './src/assets/styl/**/*.styl',
    '!./src/assets/styl/**/_*.styl'
  ])
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(stylus({
    compress: false,
    linenos: false
  }))
  .pipe(autoprefixer({
    cascade: false
  }))
  //.pipe(cleanCSS())
  .pipe(dest('./src/assets/css/'))
}

/*
  exports
*/
exports.default = () => {
  watch('./src/assets/styl/**/*.styl', css)
}
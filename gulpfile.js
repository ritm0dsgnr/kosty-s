const {src, dest, watch, parallel, series} = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean')
const avif = require('gulp-avif')
const webp = require('gulp-webp')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const include = require('gulp-include')
const fonter = require('gulp-fonter')
const ttf2woff2 = require('gulp-ttf2woff2')

function incl(){
  return src('app/pages/*.html')
    .pipe(include({
      includePaths: 'app/components'
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

function images() {
  return src(['app/img/src/*.*', '!app/img/src/*.svg'])
    .pipe(newer('app/img'))
    .pipe(avif({quality: 80}))

    .pipe(src('app/img/src/*.*'))
    .pipe(newer('app/img'))
    .pipe(webp())

    .pipe(src('app/img/src/*.*'))
    .pipe(newer('app/img'))
    .pipe(imagemin())

    .pipe(dest('app/img'))
}

function convertFonts() {
  return src('app/fonts/src/*.*')
    .pipe(fonter({
      formats: ['woff', 'ttf']
    }))
    .pipe(src('app/fonts/*.ttf'))
    .pipe(ttf2woff2())
    .pipe(dest('app/fonts'))
}

function script() {
  return src('app/js/src/main.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
  return src(['app/sass/*.sass'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({overrideBrowserslist: ['last 2 versions']}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  })
  watch(['app/components/*', 'app/pages/*'], incl)
  watch(['app/fonts/src/'], convertFonts)
  watch(['app/img/src'], images)
  watch(['app/js/src/main.js'], script)
  watch(['app/sass/*.sass'], styles)
  watch(['app/*.html']).on('change', browserSync.reload)
}

function cleanDist(){
  return src(['dist/build/*.*', '!dist/.git', '!dist/.gitignore'], { read: false })
    .pipe(clean())
}

function building(){
  return src([
    'app/fonts/*.*',
    'app/img/*.*',
    'app/js/*.js',
    'app/css/*.css',
    'app/*.html',
  ], {base: 'app'})
  .pipe(dest('dist/build'))
}

exports.incl = incl
exports.images = images
exports.convertFonts = convertFonts
exports.script = script
exports.styles = styles
exports.watching = watching
exports.build = series(cleanDist, building)

exports.default = parallel(styles, convertFonts, images, script, incl, watching)
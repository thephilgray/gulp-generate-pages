const fs = require('fs');
const gulp = require('gulp');
// const data = require('gulp-data');
const pug = require('gulp-pug');
const rename = require('gulp-rename');

const DATA_PATH = './src/data.json';
const TEMPLATE_PATH = './src/template.pug';

function pages(done) {
  const pageData = JSON.parse(fs.readFileSync(DATA_PATH));
  pageData.forEach(page =>
    gulp
      .src(TEMPLATE_PATH)
      .pipe(pug({ locals: { ...page } }))
      .pipe(rename(`${page.filename}.html`))
      .pipe(gulp.dest('build'))
  );
  done();
}

function watchPages() {
  return gulp.watch([DATA_PATH, TEMPLATE_PATH], pages);
}

exports.default = gulp.series(pages, watchPages);

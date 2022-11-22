import gulp from 'gulp';
import { deleteSync } from 'del';
import run from 'gulp-run';
import inlineSource from 'gulp-inline-source-html';
import through from 'through2';

const distCatalog = 'dist';
const codeCatalog = 'plugin-code';
const uiCatalog = 'plugin-ui';

function clean(cb) {
  deleteSync([ `${distCatalog}` ], cb());
}

function runBuildCode(cb) {
  return run('npm run plugin-code:build:dev', {}).exec();
}

function runBuildUi(cb) {
  return run('npm run plugin-ui:build:dev', {}).exec();
}

function copyCode(cb) {
  let files = [
    `${codeCatalog}/dist/${codeCatalog}/code.js`
  ];

  return gulp.src(files, {"allowEmpty": true})
    .pipe(gulp.dest(distCatalog));
}

function copyUi(cb) {
  let files = [
    `${uiCatalog}/dist/${uiCatalog}/index.html`
  ];

  return gulp.src(files, {"allowEmpty": true})
    .pipe(inlineSource({
      attribute: '',
      compress: false
    }))
    .pipe(gulp.dest(distCatalog));
}

// function runWatchCode() {
//   run('npm run code:watch').exec('', () => {
//     console.log('npm run code:watch');
//   })
//     .pipe(through.obj((chunk, enc, cb) => {
//       gulp.watch(`${codeCatalog}/dist/**/*.**`, copyCode);
//       cb(null, chunk);
//     }));
// }

// function runWatchUi() {
//   run('npm run ui:watch', {}).exec('', () => {
//     console.log('npm run ui:watch');
//   })
//     .pipe(through.obj((chunk, enc, cb) => {
//       gulp.watch(`${uiCatalog}/dist/**/*.**`, {}, copyUi);
//       cb(null, chunk);
//     }));
// }


function watch() {
  // run('npm run code:watch').exec();
  // run('npm run ui:watch', {}).exec();

  // gulp.watch(`${codeCatalog}/dist/**/*.**`, {}, copyCode);
  // gulp.watch(`${uiCatalog}/dist/**/*.**`, {}, copyUi);
  gulp.watch(`${codeCatalog}/dist/**/*.**`, {}, gulp.series(runBuildCode, copyCode));
  gulp.watch(`${uiCatalog}/dist/**/*.**`, {}, gulp.series(runBuildUi, copyUi));
}

const buildTask = gulp.series(
  clean,
  runBuildCode,
  runBuildUi,
  copyCode,
  copyUi
);
export const build = buildTask;
const defaultTask = gulp.series(
  buildTask,
  gulp.parallel(watch)
);

export default defaultTask

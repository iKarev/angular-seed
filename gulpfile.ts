import * as gulp from 'gulp';
import * as util from 'gulp-util';
import * as runSequence from 'run-sequence';
// import * as watch from 'gulp-watch';
import * as sass from 'gulp-sass';
// var watch = require('gulp-watch');
//     sass = require('gulp-sass')

import Config from './tools/config';
import { loadTasks, loadCompositeTasks } from './tools/utils';


loadTasks(Config.SEED_TASKS_DIR);
loadTasks(Config.PROJECT_TASKS_DIR);

loadCompositeTasks(Config.SEED_COMPOSITE_TASKS, Config.PROJECT_COMPOSITE_TASKS);


// --------------
// Clean dev/coverage that will only run once
// this prevents karma watchers from being broken when directories are deleted
let firstRun = true;
gulp.task('clean.once', (done: any) => {
  if (firstRun) {
    firstRun = false;
    runSequence('check.tools', 'clean.dev', 'clean.coverage', done);
  } else {
    util.log('Skipping clean on rebuild');
    done();
  }
});

gulp.task('sass', function () {
  gulp.src('./src/client/assets/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/client/assets/styles'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});


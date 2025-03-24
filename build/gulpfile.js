/* eslint-disable no-console */
const { getProjectPath, getConfig } = require('./utils/projectHelper');
const runCmd = require('./runCmd');

const merge2 = require('merge2');
const through2 = require('through2');
const babel = require('gulp-babel');
const rimraf = require('rimraf');
const stripCode = require('gulp-strip-code');

const argv = require('minimist')(process.argv.slice(2));

const gulp = require('gulp');
const ts = require('gulp-typescript');

const getBabelCommonConfig = require('./getBabelCommonConfig');
const getTSCommonConfig = require('./getTSCommonConfig');
const replaceLib = require('./replaceLib');
const sortApiTable = require('./sortApiTable');

const tsDefaultReporter = ts.reporter.defaultReporter();

const libDir = getProjectPath('lib');
const esDir = getProjectPath('es');
const distDir = getProjectPath('dist');

function babelify(js, modules) {
  const babelConfig = getBabelCommonConfig(modules);
  babelConfig.babelrc = false;
  delete babelConfig.cacheDirectory;
  if (modules === false) {
    babelConfig.plugins.push(replaceLib);
  }
  const stream = js.pipe(babel(babelConfig)).pipe(
    through2.obj(function z(file, encoding, next) {
      this.push(file.clone());
      if (modules !== false) {
        const content = file.contents.toString(encoding);
        file.contents = Buffer.from(
          content.replace(/lodash-es/g, 'lodash')
        );
        this.push(file);
      }
      next();
    })
  );
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

function compile(modules) {
  const { compile: { transformTSFile, transformFile } = {} } = getConfig();
  rimraf.sync(modules !== false ? libDir : esDir);

  const tsConfig = getTSCommonConfig(false);
  let error = 0;

  // =============================== FILE ===============================
  let transformFileStream;

  if (transformFile) {
    transformFileStream = gulp
      .src(['src/**/*.ts'])
      .pipe(
        through2.obj(function (file, encoding, next) {
          let nextFile = transformFile(file) || file;
          nextFile = Array.isArray(nextFile) ? nextFile : [nextFile];
          nextFile.forEach(f => this.push(f));
          next();
        }),
      )
      .pipe(gulp.dest(modules === false ? esDir : libDir));
  }

  // ================================ TS ================================
  const source = [
    'src/**/*.js',
    'src/**/*.ts'
  ];

  // Strip content if needed
  let sourceStream = gulp.src(source);
  if (modules === false) {
    sourceStream = sourceStream.pipe(
      stripCode({
        start_comment: '@remove-on-es-build-begin',
        end_comment: '@remove-on-es-build-end'
      })
    );
  }

  if (transformTSFile) {
    sourceStream = sourceStream.pipe(
      through2.obj(function (file, encoding, next) {
        let nextFile = transformTSFile(file) || file;
        nextFile = Array.isArray(nextFile) ? nextFile : [nextFile];
        nextFile.forEach(f => this.push(f));
        next();
      })
    );
  }

  const tsResult = sourceStream.pipe(
    ts(tsConfig, {
      error(e) {
        tsDefaultReporter.error(e);
        error = 1;
      },
      finish: tsDefaultReporter.finish,
    })
  );

  function check() {
    if (error && !argv['ignore-error']) {
      process.exit(1);
    }
  }

  tsResult.on('finish', check);
  tsResult.on('end', check);

  const tsFilesStream = babelify(tsResult.js, modules);
  const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? esDir : libDir));
  return merge2([tsFilesStream, tsd, transformFileStream].filter(s => s));
}

gulp.task('tsc', gulp.series(done => {
  runCmd('npm', ['run', 'tsc'], code => {
    if (code) {
      done(code);
      return;
    }
  });
  done();
}));

const startTime = new Date();
gulp.task('compile-with-es', done => {
  console.log('start compile at ', startTime);
  console.log('[Parallel] Compile to es...');
  compile(false).on('finish', done);
});

gulp.task('compile-with-lib', done => {
  console.log('[Parallel] Compile to js...');
  compile().on('finish', done);
});

gulp.task('compile-finalize', done => {
  // Additional process of compile finalize
  const { compile: { finalize } = {} } = getConfig();
  if (finalize) {
    console.log('[Compile] Finalization...');
    finalize();
  }
  done();
});

gulp.task('compile', gulp.series(gulp.parallel('compile-with-es', 'compile-with-lib'), 'compile-finalize', done => {
  const date = new Date();
  console.log('end compile at ', date);
  console.log('compile time ', (date - startTime) / 1000, 's');
  done();
}));

gulp.task('dist', gulp.series(done => {
  console.log('[Parallel] Compile to dist...');
  rimraf.sync(distDir);
  
  runCmd('rollup', ['-c', './rollup.config.js'], code => {
    if (code) {
      done(code);
      return;
    }
  });
  done();
}));

gulp.task('sort-api-table', gulp.series(done => {
  sortApiTable();
  done();
}));

gulp.task('build', gulp.series(gulp.parallel('compile', 'dist'), 'tsc', done => {
  done();
}));

gulp.task('release', gulp.series('build', done => {
  console.log('Publish to repository.');
  runCmd('yarn', ['publish', '--access', 'public'], code => {
    if (code) {
      done(code);
      return;
    }
  });
  done();
}));

gulp.task('clean', () => {
});
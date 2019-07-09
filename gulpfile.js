const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

const scriptsPath = 'components';

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

gulp.task('scripts', function(done) {
   const folders = getFolders(scriptsPath);

   if (folders.length === 0) return done();

   folders.map(function(folder) {
    return gulp.src(path.join(scriptsPath, folder, '/src/*.js'))
      .pipe(uglify())
      .pipe(gulp.dest(`${scriptsPath}/${folder}/js`))
   });

   return done()
});

gulp.task('styles', function(done) {
  const folders = getFolders(scriptsPath);

  if (folders.length === 0) return done();

  folders.map(function(folder) {
   return gulp.src(path.join(scriptsPath, folder, '/scss/*.scss'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(`${scriptsPath}/${folder}/css`))
  });

  return done()
});
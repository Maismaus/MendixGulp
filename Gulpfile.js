'use strict';  
var deploymentStyleFolder = 'styles';  
var proxyAddress = 'localhost:8081';  
var gulp = require('gulp'),
    sass = require('gulp-sass'),  
    browserSync = require('browser-sync').create(),  
    path = require('path'),  
    sourcemaps = require('gulp-sourcemaps');
var sourceStyleFolder = 'theme/styles';  
var sourceFolder = sourceStyleFolder + '/',  
    sourceSassFolder = sourceFolder + 'sass/',  
    sourceCssFolder = sourceFolder + 'css/';  
var deploymentFolder = 'deployment/web/' + deploymentStyleFolder,  
    deploymentCssFolder = deploymentFolder + '/css/';  


    
gulp.task('build-sass', function () {  
  return gulp.src(sourceSassFolder + '**/*.scss')  
    .pipe(sass({  
      outputStyle: 'expanded'  
    }).on('error', sass.logError))  
    .pipe(gulp.dest(sourceCssFolder))  
    .pipe(gulp.dest(deploymentCssFolder));  
});  
gulp.task('build', function () {  
  return gulp.src(sourceSassFolder + '**/*.scss')  
    .pipe(sass({  
      outputStyle: 'compressed'  
    }).on('error', sass.logError))  
    .pipe(gulp.dest(sourceCssFolder))  
    .pipe(gulp.dest(deploymentCssFolder));  
});  
gulp.task('copy-css', function () {  
  return gulp.src(sourceCssFolder + '**/*.css')  
    .pipe(gulp.dest(deploymentCssFolder));  
});  
gulp.task('watch:sass', function () {  
  gulp.watch('**/*.scss', { cwd: sourceSassFolder }, ['build-sass']);  
});  
gulp.task('watch:css', function () {  
  gulp.watch('**/*.css', { cwd: sourceCssFolder }, ['copy-css']);  
});  
gulp.task('default', ['watch:sass']);  
gulp.task('css', ['watch:css']);  
gulp.task('browsersync-sass', function () {  
  return gulp.src(sourceSassFolder + '**/*.scss')  
    .pipe(sourcemaps.init())  
    .pipe(sass({  
      outputStyle: 'expanded'  
    }).on('error', sass.logError))  
    .pipe(sourcemaps.write())  
    .pipe(gulp.dest(sourceCssFolder))  
    .pipe(gulp.dest(deploymentCssFolder))  
    .pipe(browserSync.stream());  
});  
gulp.task('watch:browsersync-sass', function () {  
  gulp.watch('**/*.scss', { cwd: sourceSassFolder }, ['browsersync-sass']);  
});  
gulp.task('dev', ['browsersync-sass', 'watch:browsersync-sass'], function () {
  console.log('Starting on folder ' + sourceSassFolder);
  browserSync.init({  
    proxy: {  
      target: proxyAddress,  
      ws: true  
    },  
    online: true,  
    open: false,  
    reloadOnRestart: true,  
    notify: true,  
    ghostMode: false  
  });  
});
function setCustomFolders(path){
  sourceSassFolder = path + sourceSassFolder;
  deploymentCssFolder = path + deploymentCssFolder;
  sourceCssFolder = path + sourceCssFolder;
}
function startOnCustomFolder(path){
  console.log(path);  
  setCustomFolders(path);
  gulp.start('dev');
}
gulp.task('myfinaps', function(){
  startOnCustomFolder('../Mendix/myfinaps/');
});
gulp.task('start', function(){
  var folder, 
      folderArgument = process.argv.indexOf("--folder"), 
      portArgument = process.argv.indexOf("--port");
  if(folderArgument >- 1) {
      folder = process.argv[folderArgument+1];
      if(portArgument >- 1){
        proxyAddress = "localhost:" + process.argv[portArgument+1];
        console.log("Starting on port " + proxyAddress);
      }
      startOnCustomFolder('../Mendix/' + folder + '/');
  }
  gulp.start('dev');
});
gulp.task('bld', function(){
  var folder, i = process.argv.indexOf("--folder");
  if(i>-1) {
      folder = process.argv[i+1];
      setCustomFolders('../Mendix/' + folder + '/');
  }
  gulp.start('build');
});
gulp.task('devbld', function(){
  var folder, i = process.argv.indexOf("--folder");
  if(i>-1) {
      folder = process.argv[i+1];
      setCustomFolders('../Mendix/' + folder + '/');
  }
  gulp.start('build-sass');
});
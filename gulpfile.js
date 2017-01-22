var gulp = require('gulp')
var uglify = require('gulp-uglify')
var clean = require('gulp-clean')
var rename = require("gulp-rename")


gulp.task("clean",function(){
  gulp.src("dist/js/*").pipe(clean({force: true}));
});



gulp.task("uglify",function(){
  return gulp.src("./src/js/*.js")
      .pipe(uglify())
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(gulp.dest('dist/js'));
});

gulp.task("default",["clean","uglify"],function(){
  console.log("压缩完成");
});

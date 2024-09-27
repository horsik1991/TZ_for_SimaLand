import email from "gulp-email-builder"
gulp.task('emailBuilder', function() {
    return gulp.src([app.path.build.pug])
      .pipe(emailBuilder(options).build())
      .pipe(gulp.dest(app.path.build.pug));
  });
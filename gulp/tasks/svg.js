export const svg = () => {
    return app.gulp.src(app.path.src.svg)
    .pipe(app.gulp.dest(app.path.build.svg))
    .pipe(app.plugins.bs.stream())   
}
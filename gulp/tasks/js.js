import wp from "webpack-stream"
export const scripts = () => {
    return app.gulp.src(app.path.src.jsModules, {sourcemaps:app.isDev})
        .pipe (app.gulp.src(app.path.src.js))
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title : "JAVASCRIPT",
                message : "Ошибка: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.plumber.stop())
        .pipe(wp({
            mode:app.isBuild ? 'production':'development',
            output:{
                filename: 'scripts.min.js'
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.bs.stream())
}
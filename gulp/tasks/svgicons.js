import svgsprite from "gulp-svg-sprite"
export const svgi = () => {
    return app.gulp.src(app.path.src.svgsprite)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title : "SVG",
            message : "Ошибка: <%= error.message %>"
        })
    ))
    .pipe(svgsprite({
        mode: {
            stack : {
                sprite: `../icons/icons.svg`,
                example: true
            }
        }
    }))
    .pipe(app.plugins.plumber.stop())
    .pipe(app.gulp.dest(app.path.build.svg))
}
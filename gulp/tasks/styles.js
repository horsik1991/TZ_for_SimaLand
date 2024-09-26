import stylus from "gulp-stylus"
import concat from "gulp-concat"
import minify from "gulp-cssmin"
import gcmq from "gulp-group-css-media-queries"//группировка медиа-запросов
import webpcss from "gulp-webpcss"
import autoPrefixer from "gulp-autoprefixer"
export const styles = () => {
    return app.gulp.src(`${app.path.src.modules}`, {sourcemaps:app.isDev}, {allowEmpty:true})
    .pipe (app.gulp.src(app.path.src.styl))
    // return app.gulp.src(`${app.path.src.styl}`, {sourcemaps:app.isDev}, {allowEmpty:true})
    // .pipe (app.gulp.src(app.path.src.modules))
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title : "STYL",
            message : "Ошибка: <%= error.message %>"
        })
    ))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(stylus())
    .pipe(
        app.plugins.ifPlugin(
            app.isBuild,
            gcmq()
        )
    )
    .pipe(
        app.plugins.ifPlugin(
            app.isBuild,
            webpcss({
            webpClass : ".webp",
            noWebpClass:".no-webp"
            })
        )
    )
    .pipe(
        app.plugins.ifPlugin(
            app.isBuild,
            autoPrefixer({
            grid:true,
            overrideBrowserlist:["last 10 versions"],
            cascade:true
            })
        )
    )
    .pipe(app.plugins.plumber.stop())
    .pipe(concat('style.css'))
    .pipe(app.gulp.dest(app.path.build.styl))

    .pipe(minify() )
    .pipe(
            concat('style.min.css')
        )
    .pipe(app.gulp.dest(app.path.build.styl))
    .pipe(app.plugins.bs.stream())    
}
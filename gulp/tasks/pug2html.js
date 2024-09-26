import pug from "gulp-pug"
//конвертирование картинок в формат webp
import webpHtml from "gulp-webp-html-nosvg" 
//добавление ключа, который состоит из даты и времени к текущему файлу стилей и скриптов - для исключения кеширования
import gulpVersionNumber from "gulp-version-number"
export const pugToHtml = () => {
    return app.gulp.src(app.path.src.pug)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title : "HTML",
            message : "Ошибка: <%= error.message %>"
        })
    ))
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(pug())
    .pipe(
        app.plugins.ifPlugin(
            app.isBuild,
            webpHtml()
        )
    )
    .pipe(app.plugins.plumber.stop())
    .pipe(
        app.plugins.ifPlugin(
            app.isBuild,
            gulpVersionNumber({
                'value':'%DT%',
                'append':{
                    'key':'_ver',
                    'cover':0,
                    'to':[
                        'css',
                        'js',
                    ]
                },
                'output':{
                    'file':'gulp/version.json'
                }
            })
        )
    )

    .pipe(app.gulp.dest(app.path.build.pug))
    .pipe(app.plugins.bs.stream())
}
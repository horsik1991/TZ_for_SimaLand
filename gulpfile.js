// импорт модулей
import gulp from 'gulp';

//импорт константы path и путей
import { path } from './gulp/config/path.js';

// Импорт задач
import { pugToHtml } from './gulp/tasks/pug2html.js';
import { reset } from './gulp/tasks/clean.js';
import { server } from './gulp/config/server.js';
import { styles } from './gulp/tasks/styles.js';
import { scripts } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { svg } from './gulp/tasks/svg.js';
import { otfToTtf, ttfToWoff, fontStyle} from './gulp/tasks/fonts.js';
import { svgi } from './gulp/tasks/svgicons.js';

export {svgi}

//Импорт переменной плагинов
import { plugins } from './gulp/config/plugins.js';

//Последовательное выполнение задач шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle)

//Константа для сборки нескольких задач в одну
const mainTasks = gulp.series(fonts, gulp.parallel(pugToHtml, styles, scripts, images))

//для удобства создается глобальный объект с повторяющимися, часто используемыми значениями переменных
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher,server))
const build = gulp.series(reset, mainTasks)

export {dev}
export{build}

//дефолтный таск
gulp.task('default', dev)

gulp.task('test',gulp.series(reset, styles))
//Наблюдатель за изменениями
function watcher(){
    gulp.watch(path.watch.pug, pugToHtml)
    gulp.watch(path.watch.styl, styles)
    gulp.watch(path.watch.js, scripts)
    gulp.watch(path.watch.modules, styles)
    gulp.watch(path.watch.images, images)
}
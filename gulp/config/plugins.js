import replace from "gulp-replace" //замена по регулярному выражению
import plumber from "gulp-plumber" //поиск ошибок
import notify from "gulp-notify" //вывод сообщений в окно виндоус
import bs from "browser-sync"
import newer from "gulp-newer"//проверяет обновилась ли картинка, чтобы не загружать повторно ту, которая уже есть
import ifPlugin from "gulp-if"

//Экспорт плагинов
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    bs: bs,
    newer: newer,
    ifPlugin: ifPlugin
}
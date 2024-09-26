const buildFolder = `./dist`; //Конечная папка
const srcFolder = `./dev`; //Исходники
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());
export const path = { //export добавляется, чтобы можно было использовать данные константы в любых других частях проекта
    build: {
        images: `${buildFolder}/img`,
        svg: `${buildFolder}/img/icons`,
        js:`${buildFolder}/js`,
        styl:`${buildFolder}/styles`,
        pug:`${buildFolder}`,
        fonts:`${buildFolder}/fonts`,
        files: `${buildFolder}`//настройка конечного пути. 
    },
    src :{
        images: `${srcFolder}/static/img/**/*.{jpg,png,gif,jpeg,webp,ico,svg}`,
        //svg: `${srcFolder}/static/img/icons/*.svg`,
        js:`${srcFolder}/blocks/**/*.js`,
        modules : `${srcFolder}/static/styles/modules/*.styl`,
        styl: `${srcFolder}/blocks/**/*.styl`,
        jsModules: `${srcFolder}/static/js/modules/*.js`,
        pug:`${srcFolder}/pages/*.pug`,
        files: `${srcFolder}/**/*.*`,//Подгрузка всех файлов и папок, входящих в src/files
        svgsprite: `${srcFolder}/img/svgicons/*.svg`
    },
    watch: {
        images: `${srcFolder}/static/img/**/*.{jpg,png,gif,jpeg,webp,ico,svg}`,
        js:`${srcFolder}/blocks/**/*.js`,
        styl: `${srcFolder}/blocks/**/*.styl`,
        modules: `${srcFolder}/static/styles/modules/*.styl`,
        pug: `${srcFolder}/**/*.pug`,
        files: `${srcFolder}/**/*.*`
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``
}
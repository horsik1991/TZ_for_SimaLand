import fs, { appendFile } from "fs"
import ttf2woff2 from "gulp-ttf2woff2"
import fonter from "gulp-fonter"
export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/static/fonts/*.otf`,{}) //найти все файлы otf
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "FONTS",
            message: "Ошибка: <%= error.message %>"
        })
    ))
    //сконвертировать их в ttf и положить в ИСХОДНУЮ папку
    .pipe(fonter({
        formats:['ttf']
    }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/static/fonts/`))
}
export const ttfToWoff = () => {
	// Ищем файлы шрифтов .ttf
	return app.gulp.src(`${app.path.srcFolder}/static/fonts/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				message: "Error: <%= error.message %>"
			}))
		)
		// Конвертируем в .woff
		.pipe(fonter({
			formats: ['woff']
		}))
		// Выгружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		// Ищем файлы шрифтов .ttf
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		// Конвертируем в .woff2
		.pipe(ttf2woff2())
		// Выгружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		// Ищем файлы шрифтов .woff и woff2
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.{woff,woff2}`))
		// Выгружаем в папку с результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`));
}
export const fontStyle = () => {
	let fontsFile = `${app.path.srcFolder}/static/styles/modules/fonts.styl`;
	// Если передан флаг --rewrite удаляем файл подключения шрифтов
	app.isFontsReW ? fs.unlink(fontsFile, cb) : null;
	// Проверяем существуют ли файлы шрифтов
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) {
			// Проверяем существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файла нет, создаем его
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					// Записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}
						fs.appendFile(fontsFile,
`@font-face{
    font-family: ${fontName};\n
    font-display: swap;\n
    src: url("fonts/${fontFileName}.woff2") format("woff2"), url("fonts/${fontFileName}.woff") format("woff");\n
    font-weight: ${fontWeight};\n
    font-style:normal;\n
}\r\n`, cb

                        );
            
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Если файл есть, выводим сообщение
				console.log("Файл static/fonts/fonts.styl уже существует. Для обновления файла нужно его удалить!");

			}
		} else {
			// Если шрифтов нет
			fs.unlink(fontsFile, cb)
		}
	});
	return app.gulp.src(`${app.path.srcFolder}`);
}
function cb() { }

    
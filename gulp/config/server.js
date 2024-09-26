export const server = (done) => {
    app.plugins.bs.init({
        server : {
            baseDir: `${app.path.build.pug}`
        },
        notify:false,
        port:3000,
    })
}
/* eslint-disable no-console */
const fs = require('fs'),
    path = require('path'),
    polka = require('polka')
    vueSR = require('vue-server-renderer');

let renderer;
const app = polka();
require('./ssr/setup-dev-server.js')(app, {
    render(bundle) {
        renderer = vueSR.createBundleRenderer(bundle);
        renderer.renderToString().then(html => {
            fs.writeFileSync("./ssr/cache/"+process.argv[2]+".tmp", JSON.stringify(html))
        }).catch((e) => {
            console.log(e)
            fs.appendFileSync("./ssr/logs/errors.log", `\n${e.toString()}`)
            fs.writeFileSync("./ssr/cache/"+process.argv[2]+".tmp", '')
        })
    },
});

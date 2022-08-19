/* eslint-disable no-console */
const path = require('path'),
	webpack = require('webpack'),
	MFS = require('memory-fs');

const serverConfig = require('./webpack/webpack-server');

module.exports = (app, opts) => {
    const
        serverCompiler = webpack(serverConfig),
        mfs = new MFS(),
        serverBundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json');

    serverCompiler.outputFileSystem = mfs;

    serverCompiler.run((err, stats) => {
        if (err) throw err;
/*        stats = stats.toJson();
        stats.errors.forEach(err => console.error(err));
        stats.warnings.forEach(err => console.warn(err));*/
        opts.render(JSON.parse(mfs.readFileSync(serverBundlePath, 'utf-8')));
    });
};

const path = require('path'),
    {createConfig} = require('./webpack-base.js'),
    {DefinePlugin} = require('webpack'),
    VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const webpack = require("webpack");

const baseConfig = createConfig('server');

const serverConfig = Object.assign({}, baseConfig, {
    target: 'node',
    entry: './ssr/entry/server.js',
    output: {
        ...baseConfig.output,
        libraryTarget: 'commonjs2',
        filename: 'server-bundle.js',
        path: path.resolve(process.cwd(), 'dist/server'),
    },
    externals: Object.keys(require('../../../../package.json').dependencies),
    plugins: (baseConfig.plugins || []).concat([
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            window: undefined,
            document: undefined,
        }),
        new VueSSRServerPlugin(),
    ]),
});

serverConfig.module.rules = (baseConfig.module.rules || []).concat([
    {
        test: /\.(styl(us)?|css|less|sass|scss|sss)$/,
        loader: 'null-loader',
    },
]);

module.exports = serverConfig;

const path = require('path'),
    { VueLoaderPlugin } = require('vue-loader'),
    { DefinePlugin } = require('webpack');

exports.createConfig = (runtimeEnv) => {
    const vueLoader = {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {

        },
    };

    return {
        devtool: false,
        mode: 'production',
        output: {
            publicPath: '/dist/',
            filename: '[name].[chunkhash:8].js',
            chunkFilename: '[name].[chunkhash:8].js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    // needed for vue-loader to correctly import modules' components
                    exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
                },
                vueLoader
            ],
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            modules: [
                'node_modules',
                process.cwd(),
            ],
        },
        performance: {
            hints: false,
        },
        plugins: [
            new VueLoaderPlugin()
        ],
        stats: {
            all: false,
            colors: true,
            errors: true,
            hash: true,
            timings: true,
            version: true,
        }
    };
};

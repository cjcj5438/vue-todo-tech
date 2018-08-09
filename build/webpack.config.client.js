const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');
const isDev = process.env.NODE_ENV === 'development';
const devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
        errors: true,
    },
    hot: true
};
/*为什么这个配置要写在client 里面呢?
* 因为只有client里面使用, 服务端也要这里使用*/
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin()
]
if (isDev) {
    config = merge(baseConfig, {
        module: {
            rules: [{
                test: /\.styl/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    /* vue-loader的配置也可写在这里
                    {
                        loader:"css-loader",
                        options:{
                            module:true,
                            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : "[hash:base64:5]",
                        }
                    },*/
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ]
            }]
        },
        devtool: '#cheap-module-eval-source-map',
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    });
} else {
    config = merge(baseConfig, {

        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                },
            ]
        },
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    })
}

module.exports = config

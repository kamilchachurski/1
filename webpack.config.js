const path = require('path');
const merge = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpack = require('imagemin-webpack');

const common = {
    context: path.resolve(__dirname, 'source'),
    entry: {
        index: 'pages/index/index.js'
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'source')],
        extensions: ['.js']
    },
    module: {
        rules: [{
                test: /\.html/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        interpolate: true,
                        minimize: true
                    }
                }]
            }, {
                test: /\.s?css$/,
                use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 2
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: [require('autoprefixer')(), require('cssnano')()]
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }, {
                        loader: 'eslint-loader'
                    }
                ]
            }, {
                test: /\.(eot|(o|t)tf|woff2?)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        outputPath: 'fonts',
                        name: '[name].[contenthash:8].[ext]'
                    }
                }]
            }, {
                test: /\.(a?png|bmp|gif|ico|jpe?g|mp3|mp4|ogg|svg|tiff?|wav|webm|webp)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        outputPath: 'multimedia',
                        name: '[name].[contenthash:8].[ext]'
                    }
                }]
            }, {
                test: /\.pdf$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        outputPath: 'documents',
                        name: '[name].[contenthash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DotenvWebpack(),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            template: 'pages/index/index.html',
            favicon: 'static/favicon.ico'
        })
    ]
};

const development = merge({
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 8888,
        useLocalIp: true,
        historyApiFallback: true,
        open: true,
        overlay: true,
        watchContentBase: true,
        compress: true,
        stats: 'errors-warnings',
        clientLogLevel: 'warn'
    },
    output: {
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.s?css$/,
            use: 'style-loader'
        }]
    }
}, common);

const production = merge({
    mode: 'production',
    performance: {
        hints: false
    },
    devtool: 'source-map',
    output: {
        publicPath: '',
        path: path.resolve(__dirname, 'build'),
        filename: 'scripts/[name].[contenthash:8].js',
        chunkFilename: 'scripts/[name].[contenthash:8].js'
    },
    module: {
        rules: [{
            test: /\.s?css$/,
            use: [{
                loader: ExtractCssChunksWebpackPlugin.loader,
                options: {
                    publicPath: '../'
                }
            }]
        }]
    },
    plugins: [
        new ExtractCssChunksWebpackPlugin({
            filename: 'styles/[name].[contenthash:8].css',
            chunkFilename: 'styles/[name].[contenthash:8].css'
        }),
        new CopyWebpackPlugin([{
            from: 'static',
            to: ''
        }]),
        new ImageminWebpack({
            imageminOptions: {
                plugins: [
                    ['mozjpeg', {
                        quality: 80
                    }],
                    ['pngquant', {
                        speed: 1,
                        strip: true,
                        quality: [0.8, 1]
                    }],
                    ['svgo', {}],
                    ['gifsicle', {
                        interlaced: true,
                        optimizationLevel: 3
                    }]
                ]
            }
        })
    ]
}, common);

module.exports =
    (process.env.NODE_ENV === 'development')
        ? development
        : production;
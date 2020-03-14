const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');


const publicPath = process.argv[process.argv.indexOf('--mode') + 1] === 'production' ? 'https://ukeloop.github.io/gk6x_gui/' : '/';

module.exports = [
    {
        entry: {
            app: [
                './src/js/index.js',
                './src/sass/style.scss',
            ],
        },
        output: {
            path: path.resolve(__dirname, 'docs'),
            filename: 'assets/js/[name].js?v=[hash]',
            publicPath: publicPath,
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'docs'),
            watchContentBase: true,
            port: 3000,
            open: true,
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: MiniCssExtractPlugin.loader,
                    }, {
                        loader: 'css-loader',
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('tailwindcss'),
                            ],
                        },
                    }, {
                        loader: 'sass-loader',
                    }],
                },
                {
                    test: /\.json$/,
                    loader: "json-loader",
                    type: "javascript/auto"
                },
                {
                    test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,
                    use: [
                        {
                            loader: 'url-loader?limit=100000&name=images/[name].[ext]?v=[hash]',
                        },
                    ],
                },
            ],
        },
        optimization: {
            minimize: true,
            minimizer: [
                new OptimizeCSSAssetsPlugin(),
                new TerserPlugin()
            ],
            splitChunks: {
                name: 'vendor',
                chunks: 'initial',
            }
        },
        resolve: {
            extensions: ['.js', '.vue'],
            alias: {
                "vue": "vue/dist/vue.esm.js"
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                title: 'GK6X GUI',
                meta: {
                    viewport: 'width=device-width,initial-scale=1',
                    description: 'Configure keys on GK6X keyboards (GK64, GK84, GK61, etc) - GK6X GUI',
                    'og:title': 'GK6X GUI',
                    'og:type': 'website',
                    'og:url': publicPath,
                    'og:image': path.resolve(publicPath, 'assets/images/ogp.png'),
                    'og:site_name': 'GK6X GUI',
                    'og:description': 'Configure keys on GK6X keyboards (GK64, GK84, GK61, etc) - GK6X GUI',
                    'og:locale': 'en_US',
                    'twitter:card': 'summary',
                },
                favicon: path.resolve(__dirname, 'src/favicon.ico'),
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                },
            }),
            new WebpackPwaManifest({
                filename: "[name].[ext]",
                name: "GK6X GUI",
                short_name: "GK6X GUI",
                description: "Configure keys on GK6X keyboards (GK64, GK84, GK61, etc) - GK6X GUI",
                background_color: "#262626",
                theme_color: "#262626",
                start_url: publicPath + "?utm_source=homescreen",
                display: "standalone",
                orientation: "any",
                lang: "English",
                publicPath: publicPath,
                fingerprints: false,
                ios: true,
                icons: [
                    {
                        src: path.resolve(__dirname, 'src/images/icon.png'),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: '/assets/images/icons/ios',
                        ios: true
                    }
                ],
            }),
            new VueLoaderPlugin(),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'src/images/'),
                    to: path.resolve(__dirname, 'docs/assets/images/'),
                },
            ]),
            new ImageminPlugin({
                test: /\.(jpe?g|png|gif|svg)$/i,
                pngquant: {
                    quality: '95-100',
                },
            }),
            new MiniCssExtractPlugin({
                filename: 'assets/css/style.css?v=[hash]',
            }),
            new WorkboxWebpackPlugin.InjectManifest({
                swSrc: path.resolve(__dirname, 'src/sw.js'),
                swDest: path.resolve(__dirname, 'docs/sw.js'),
                exclude: [/\.DS*/],
            }),
        ],
    },
];

// eslint-disable-next-line no-unused-vars
const webpack              = require('webpack');
const path                 = require('path');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin         = require('assets-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const glob                 = require('glob');
const ImageMinPlugin       = require('imagemin-webpack-plugin').default;
const imageMinMozJpeg      = require('imagemin-mozjpeg');

module.exports = {
  entry: {
    main: path.join(__dirname, 'src', 'index.js'),
    cms:  path.join(__dirname, 'src', 'js', 'cms.js'),
  },

  output: {
    path: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test:   /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=/[hash].[ext]',
      },
      {
        loader:  'babel-loader',
        test:    /\.js?$/,
        exclude: /node_modules/,
        query:   {cacheDirectory: true},
      },
      {
        test:    /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use:     [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ],
      },
    ],
  },

  plugins: [
    new AssetsPlugin({
      filename:    'webpack.json',
      path:        path.join(process.cwd(), 'site/data'),
      prettyPrint: true,
    }),
    new CopyWebpackPlugin([
      {
        from:    './src/fonts/',
        to:      'fonts/',
        flatten: true,
      },
    ]),
    new HtmlWebpackPlugin({
      filename: 'admin/index.html',
      template: 'src/cms.html',
      inject:   false,
    }),
    /*
     new CopyWebpackPlugin([
     {
     from: 'site/static/images',
     to:   path.resolve(__dirname, 'dist', 'img'),
     },
     ]),*/
    new ImageMinPlugin({
      externalImages: {
        context:     'site', // Important! This tells the plugin where to "base" the paths at
        sources:     glob.sync('site/static/images/**/*'),
        destination: 'dist/img',
        fileName:    '[name].[ext]', // (filePath) => filePath.replace('jpg', 'webp') is also possible
      },
      plugins:        [
        imageMinMozJpeg({quality: 75}),
      ],
    }),
  ],
};

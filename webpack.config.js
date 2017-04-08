const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PORT = process.env.port || 8080;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      publicPath: '/',
      // need this for enabling sourceMaps
      // TODO: of course, this needs to be dev/prod aware
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin(),
    ],
  },
  parts.lintJavaScript({ include: PATHS.app }),
  parts.lintCSS({ files: `${PATHS.app}/**/*.scss` }),
  parts.transpileJSX({ include: PATHS.app, exclude: /node_modules/ }),
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: PORT,
  }),
  parts.loadCSS(),
]);

const productionConfig = merge([
  parts.extractCSS(),
  parts.loadImages(),
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};

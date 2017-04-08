const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const CSS_LOADER = {
  loader: 'css-loader', // enables CSS modules / loads CSS via import and returns CSS code
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: '[name]_[local]_[hash:base64:5]', // specifies the format of the output styles
    // importLoaders: 1,  // ?do we actually need this?
  },
};

const SASS_LOADER = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
};

const AUTOPREFIXER = {
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      autoprefixer,
    ]),
  },
};

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});

exports.lintJavaScript = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include,
        exclude,
        options,
      },
    ],
  },
});

exports.lintCSS = () => ({
  plugins: [
    new StyleLintPlugin(),
  ],
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' }, // loads imported CSS and injects into document via <link> tag
          CSS_LOADER,
          SASS_LOADER,
          AUTOPREFIXER,
        ],
        include,
        exclude,
      },
    ],
  },
});

exports.loadJSX = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include,
        exclude,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
});

exports.extractCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            CSS_LOADER,
            SASS_LOADER,
            AUTOPREFIXER,
          ],
          fallback: 'style-loader',
        }),
        include,
        exclude,
      },
    ],
  },
  plugins: [
    // Output extracted CSS to a file
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
    }),
  ],
});

exports.loadImages = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options: {
            limit: 15000,
            name: '/public/images/[name].[ext]',
          },
        },
      },
    ],
  },
});

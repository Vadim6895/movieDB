const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');

let mode = 'development';
let target = 'web';
let sourceMap = 'inline-source-map';
if ((process.env.NODE_ENV || '').trim() === 'production') {
  mode = 'production';
  target = 'browserslist';
  sourceMap = false;
}

// const generateHtmlPlugins = () => {
//   const pages = fs.readdirSync('./src');
//   const htmlPageNames = pages.filter((page) => page.split('.')[1] === 'html');

//   return htmlPageNames.map((fileName) => {
//     const [name, extension] = fileName.split('.');
//     return new HtmlWebpackPlugin({
//       template: `./src/${name}.${extension}`,
//       filename: `${name}.${extension}`,
//     });
//   });
// };

const plugins = [
  mode === 'development' && new ReactRefreshWebpackPlugin(),
  new Dotenv(),
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: './src/vendors',
        to: './vendors',
      },
    ],
  }),
  new ImageminPlugin({
    disable: mode !== 'production',
    test: /\.(png|jpe?g|svg)$/i,
    optipng: {
      optimizationLevel: 3,
    },
    jpegtran: {
      progressive: true,
    },
  }),
]; // .concat(generateHtmlPlugins());

module.exports = {
  mode,
  target,
  plugins,
  devtool: sourceMap,
  entry: {
    bundle: './src/js/index.tsx',
  },
  devServer: {
    historyApiFallback: true,
    watchFiles: ['src/**'],
    compress: true,
    hot: true,
    open: true,
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    // publicPath: '/',
    filename: 'js/[name].js',
    clean: mode === 'production',
  },

  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },

  stats: {
    loggingDebug: ['sass-loader'],
  },

  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                auto: true,
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp|ico)$/i,
        type: mode === 'production' ? 'asset' : 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      // {
      //   test: /\.(ts|tsx|js)/,
      //   exclude: /node_modules/,
      //   resolve: {
      //     extensions: ['.ts', '.tsx', '.js', '.jsx'],
      //   },
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         '@babel/preset-env',
      //         '@babel/preset-react',
      //         '@babel/preset-typescript',
      //       ],
      //       cacheDirectory: true,
      //       plugins: [
      //         mode === 'development' && require.resolve('react-refresh/babel'),
      //       ].filter(Boolean),
      //     },
      //   },
      // },
      {
        test: /\.(ts|tsx|js|jsx)/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true,
              plugins: [
                mode === 'development' &&
                  require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
};

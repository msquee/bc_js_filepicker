const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: path.join(__dirname, '/src/main.js'),
  output: {
    path: path.resolve(__dirname),
    filename: 'form.js'
  },
  module: {
    rules: [
      { test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009'
                  },
                  stage: 3
                })
              ],
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new PurgecssPlugin({
      paths: glob.sync(`${ path.join(__dirname, '/src/main.js')}/**/*`, { nodir: true }),
    }),
  ]
};
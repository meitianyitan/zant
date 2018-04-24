/**
 * 公共配置
 */
const path = require('path');
const webpack = require('webpack');
const package = require('../package.json');

const setTheme = require('./theme');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

process.noDeprecation = true;

module.exports = {
  // 加载器
  module: {
    // https://doc.webpack-china.org/guides/migrating/#module-loaders-module-rules
    rules: [{
      // https://vue-loader.vuejs.org/en/configurations/extract-css.html
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          css: 'vue-style-loader!css-loader',
          less: 'vue-style-loader!css-loader!less-loader'
        },
        postLoaders: {
          html: 'babel-loader'
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader', exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'autoprefixer-loader'
      ]
    }, {
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'less-loader',
          options: {
            modifyVars: { "@btn-primary-bg": "#1DA57A" },
          },
        }
      ]
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader?sourceMap'
      ]
    }, { 
      test: /\.(ico|png|jpe?g|gif)\??.*$/, 
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('static/img/[name].[hash:8].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|svg|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('static/fonts/[name].[hash:8].[ext]')
      }
    }, { 
      test: /\.(html|tpl)$/, 
      loader: 'html-loader' 
    }]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.VERSION': `'${package.version}'`
    }),
  ]
}
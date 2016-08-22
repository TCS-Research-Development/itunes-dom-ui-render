var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    javascript: './app.js',
   // html: '/static/index.html'
  },
  output: { 
    path: path.join(__dirname, './static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
       //{
       //  test: /\.html$/,
      //   loader: "file?name=[name].[ext]",
     ////  },
     //  {
     //    test: /\.css$/, 
      //   loader: "style-loader!css-loader" 
     //  }
      // { 
      //   test: /\.png$/, 
      //   loader: "url-loader?limit=100000" 
      // },
      // { 
      //   test: /\.jpg$/, 
      //   loader: "file-loader" 
      // }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
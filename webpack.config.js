const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('config');

const entries = {
  'leaflet-example': {
    src: './src/leaflet/leafletExample.js',
    templateSrc: './template.html'
  },
  'mapbox-example': {
    src: './src/mapbox-gl/mapboxExample.js',
    templateSrc: './template.html'
  },
  'mapbox-regions': {
    src: './src/mapbox-gl/regions.js',
    templateSrc: './template.html'
  },
  'mapbox-points': {
    src: './src/mapbox-gl/points.js',
    templateSrc: './template.html'
  },
  'mapbox-points-clusterization': {
    src: './src/mapbox-gl/points-clusterization.js',
    templateSrc: './template.html'
  },
  'mapbox-points-tiles': {
    src: './src/mapbox-gl/points-tiles.js',
    templateSrc: './template.html'
  },
  'mapbox-3d-buildings': {
    src: './src/mapbox-gl/3dbuildings.js',
    templateSrc: './template.html'
  },
  'mapbox-3d-model': {
    src: './src/mapbox-gl/3d-model.js',
    templateSrc: './template.html'
  },
  'mapbox-custom-buildings': {
    src: './src/mapbox-gl/custom-buildings.js',
    templateSrc: './template.html'
  },
  'compare-example': {
    src: './src/compareExample.js',
    templateSrc: './compareTemplate.html'
  },
  'leaflet-regions': {
    src: './src/leaflet/regions.js',
    templateSrc: './template.html'
  },
  'leaflet-points': {
    src: './src/leaflet/points.js',
    templateSrc: './template.html'
  },
  'leaflet-points-clusterization': {
    src: './src/leaflet/points-clusterization.js',
    templateSrc: './template.html'
  },
  'leaflet-points-tiles': {
    src: './src/leaflet/points-tiles.js',
    templateSrc: './template.html'
  },
}
const entry = {};

const htmlPlugins = Object.keys(entries).map(name => {
  entry[name] = entries[name].src;
  return new HtmlWebpackPlugin({
    cache: false,
    template: entries[name].templateSrc,
    chunks: ["common", name],
    filename: `${name}.html`,
    title: name,
  })
});
console.log(process.env.NODE_ENV)
module.exports = {
  mode: process.env.NODE_ENV,
  entry,
  plugins: htmlPlugins.concat(
    new webpack.DefinePlugin({
      sourcesUrl: JSON.stringify(config.get('sourcesUrl'))
    })
  ),
  output: {
    publicPath:  '/public/dist/',
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].[hash].js'
  },

  module: {
    rules: [
      { test: /\.css/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|gif)($|\?.+)/, loader: 'url-loader?limit=10&name=img/[name].[ext]' },
      {
        test: /\.svg($|\?.+)/,
        loader: 'svg-url-loader?limit=10&noquotes=true&name=img/[name].[ext]',
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/dist'),
    compress: true,
    port: 2000
  }
};

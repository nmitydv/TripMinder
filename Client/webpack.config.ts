import path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: './src/main.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,  // Match both .ts and .tsx files
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,  // Match image files
        type: 'asset/resource',  // or use 'file-loader'
      },
      {
        test: /\.(mp3|wav|ogg)$/i,  // Match audio files
        type: 'asset/resource',  // or use 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,  // Match font files
        type: 'asset/resource',  // or use 'file-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

export default config;

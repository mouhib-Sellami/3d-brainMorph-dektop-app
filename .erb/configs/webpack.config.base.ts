import webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';
import path from 'path';
import Dotenv from 'dotenv-webpack'; // Import the dotenv-webpack plugin

// Helper to resolve paths
const resolve = (dir: string) => path.resolve(__dirname, dir);

const configuration: webpack.Configuration = {
  externals: [...Object.keys(externals || {})],

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              module: 'esnext',
            },
          },
        },
      },
      {
        test: /\.zpt$/,
        use: {
          loader: 'file-loader',  // Or any other appropriate loader
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/', // Customize as needed
          },
        },
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src'),

        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader', // Interprets `@import` and `url()` like `import/require()` and will resolve them
          
          {
            loader: 'sass-loader', // Loads a Sass/SCSS file and compiles it to CSS
            options: {
              sassOptions: {
                silent: true,
              },
            },
          },
        ],
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'style-loader', // Injects styles into the DOM
      //     'css-loader', // Interprets `@import` and `url()` like `import/require()` and will resolve them
      //     {
      //       loader: 'sass-loader', // Loads a Sass/SCSS file and compiles it to CSS
      //       options: {
      //         sassOptions: {
      //           silent: true,
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    library: {
      type: 'commonjs2',
    },
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      '@assets': 'assets',
      '@components': 'src/renderer/components',
      '@common': 'src/common',
      '@main': 'src/main',
      '@renderer': 'src/renderer',
      '@src': 'src',
      '@styles': 'src/renderer/styles',
      '@': 'src/renderer/',
      '@/hooks': 'src/renderer/hooks',
    },
  },

  plugins: [
    // Use dotenv-webpack to inject environment variables
    new Dotenv({
      path: './.env', // Path to your .env file
      safe: true, // Optional: validate your .env file to ensure required variables are present
      systemvars: true, // Optional: Allow system environment variables
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};

export default configuration;
import path from "path"
import webpack from "webpack"
import { Plugins } from "./Plugins"
import { IConfig } from "./types"

export function Config({ paths }: IConfig): webpack.Configuration {
  const { entry, output } = paths
  return {
    entry: entry,
    output: {
      path: output,
      filename: "[name].[contenthash].bundle.js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: Plugins({ paths }),
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },  
  }
}

import { DevServer } from "./DevServer"
import { Module } from "./Module"
import { Plugins } from "./Plugins"
import { IConfig } from "./types"

import webpack from "webpack"
import "webpack-dev-server"

export function Config({ paths, mode, port }: IConfig): webpack.Configuration {
  const { entry, output } = paths
  return {
    mode,
    devServer: DevServer({ mode, port }),
    entry: entry,
    output: {
      path: output,
      filename: "[name].[contenthash].bundle.js",
      clean: true,
    },
    module: {
      rules: Module(),
    },
    plugins: Plugins({ paths }),
    resolve: {
      extensions: [".ts", ".js", ".tsx", ".jsx"],
    },
  }
}

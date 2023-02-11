import { DevServer } from "./DevServer"
import { Plugins } from "./Plugins"
import { IConfig } from "./types"

import webpack from "webpack"
import "webpack-dev-server"
import { Module } from "./Module"

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
    module: Module(),
    plugins: Plugins({ paths }),
    resolve: {
      extensions: [".ts", ".js", ".tsx", ".jsx"],
    },
  }
}

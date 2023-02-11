import { IPlugins } from "./types"

import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"

export function Plugins({ paths }: IPlugins): webpack.WebpackPluginInstance[] {
  const { html } = paths
  return [
    new HtmlWebpackPlugin({
      template: html,
    }),
    new webpack.ProgressPlugin(),
  ]
}

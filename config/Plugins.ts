import { IPlugins } from "./types"

import HtmlWebpackPlugin from "html-webpack-plugin"

export function Plugins({ paths }: IPlugins) {
  const { html } = paths
  return [
    new HtmlWebpackPlugin({
      template: html,
    }),
  ]
}

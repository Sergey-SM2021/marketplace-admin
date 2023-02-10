import { IConfig } from './types';
import HtmlWebpackPlugin from "html-webpack-plugin"

export function Plugins({ paths }: IConfig) {
    const { html } = paths
    return [
      new HtmlWebpackPlugin({
        template: html,
      }),
    ]
  }
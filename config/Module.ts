import MiniCssExtractPlugin from "mini-css-extract-plugin"
import webpack from "webpack"

export function Module(): webpack.RuleSetRule[] {
  const ts = {
    test: /\.tsx?$/,
    use: ["ts-loader"],
    exclude: /node_modules/,
  }
  const scss = {
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: true,
            localIdentName: "[local].[name].[contenthash]",
          },
        },
      },
      "sass-loader",
      "postcss-loader",
    ],
  }
  return [ts, scss]
}

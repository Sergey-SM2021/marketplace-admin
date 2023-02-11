export function Module() {
  const ts = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  }
  const scss = {
    test: /\.(sa|sc|c)ss$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: true,
        },
      },
      "sass-loader",
    ],
  }
  return {
    rules: [ts, scss],
  }
}

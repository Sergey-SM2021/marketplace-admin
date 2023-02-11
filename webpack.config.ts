import { Config } from "./config/config"
import { IConfig } from "./config/types"

import path from "path"

interface IEnv {
  MODE?: "development" | "production",
  PORT?: number
}

export default function (env: IEnv) {
  const config: IConfig = {
    paths: {
      entry: path.resolve(__dirname, "testEnv", "Main.tsx"),
      html: path.resolve(__dirname, "testEnv", "index.html"),
      output: path.resolve(__dirname, "build"),
    },
    mode: env.MODE || "development",
    port: env.PORT || 3201,
  }
  return Config(config)
}

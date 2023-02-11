import { Config } from "./config/config"
import { IConfig } from "./config/types"

import path from "path"

const config: IConfig = {
  paths: {
    entry: path.resolve(__dirname, "testEnv", "Main.tsx"),
    html: path.resolve(__dirname, "testEnv", "index.html"),
    output: path.resolve(__dirname, "build"),
  },
  mode:'development',
  port:1313,
}

export default function () {
  return Config(config)
}

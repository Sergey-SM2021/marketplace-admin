import { Config } from "./config/config"

import * as path from "path"
import { IConfig } from "./config/types"

const config: IConfig = {
  paths: {
    entry: path.resolve(__dirname, "testEnv", "main.ts"),
    html: path.resolve(__dirname, "testEnv", "index.html"),
    output: path.resolve(__dirname, "build"),
  },
}

export default function () {
  return Config(config)
}

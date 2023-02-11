export interface IPaths {
  entry: string
  output: string
  html: string
}

export interface IConfig {
  paths: IPaths
  mode: "development" | "production"
  port: number
}

export type IPlugins = Omit<IConfig,"mode" | "port">

export type IDevServer = Omit<IConfig,"paths">
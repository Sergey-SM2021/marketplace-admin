import { IDevServer } from "./types"

export function DevServer({ mode, port }: IDevServer) {
  return mode === "development"
    ? {
        port: port,
        open: true,
      }
    : undefined
}

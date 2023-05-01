import { type FC, type PropsWithChildren } from "react"

interface ISubtitle {}

export const Subtitle: FC<ISubtitle & PropsWithChildren> = ({ children }) => {
  return <h2 className="font-semibold text-2xl">{children}</h2>
}

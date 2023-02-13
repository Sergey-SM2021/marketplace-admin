import { FC, PropsWithChildren } from "react"

interface IProps {
}

export const Title:FC<IProps & PropsWithChildren> = ({children}) => {
    return <h1 className="text-2xl font-bold">{children}</h1>
}
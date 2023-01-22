import { FC } from "react"

interface IProps {
    title:string
}

export const Title:FC<IProps> = ({title}) => {
    return <h2>{title}</h2>
}
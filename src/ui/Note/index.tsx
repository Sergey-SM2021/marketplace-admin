import { FC, useEffect, useState } from "react"
import style from "./index.module.sass"

interface INote {
  message: string
}

export const Note: FC<INote> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, 1000)
  }, [])
  if (!isVisible) {
    return null
  }
  return <div className={style.note}>{message}</div>
}

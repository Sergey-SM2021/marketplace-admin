import { FC, useEffect } from "react"
import style from "./index.module.scss"
import { ReactComponent as Accept } from "assets/accept.svg"
import { ReactComponent as Cancel } from "assets/cancle.svg"

interface INote {
  message: string
  unMount: () => void
  onAccept: () => void
}

export const Note: FC<INote> = ({ message, unMount, onAccept }) => {
  
  useEffect(() => {
    setTimeout(() => {
      unMount()
    }, 3600)
  }, [])

  const handlerAccept = () => {
    onAccept()
  }

  const handlerClose = () => {
    unMount()
  }
  
  return (
    <div className={style.note}>
      {message}
      <div className={style.note__accept} onClick={handlerAccept}>
        <Accept />
      </div>
      <div className={style.note__cancel} onClick={handlerClose}>
        <Cancel />
      </div>
    </div>
  )
}

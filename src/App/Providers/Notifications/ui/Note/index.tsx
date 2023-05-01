import { type FC, memo, useEffect } from "react"
import style from "./index.module.scss"
import { ReactComponent as Accept } from "assets/accept.svg"
import { ReactComponent as Cancel } from "assets/cancle.svg"

export interface INotification {
  id: number
  text: string
  onAccept: (id:number) => void
  unMount: (id:number) => void
}

export const Note: FC<INotification> = memo(
  ({ id, onAccept, text, unMount }) => {
    useEffect(() => {
      setTimeout(() => {
        unMount(id)
      }, 3600)
    }, [])

    const handlerAccept = () => {
      onAccept(id)
      unMount(id)
    }

    const handlerClose = () => {
      unMount(id)
    }

    return (
      <div className={style.note}>
        {text}
        <div className={style.note__accept} onClick={handlerAccept}>
          <Accept className={style.note__icon} />
        </div>
        <div className={style.note__cancel} onClick={handlerClose}>
          <Cancel className={style.note__icon} />
        </div>
      </div>
    )
  }
)

import { FC, PropsWithChildren, SyntheticEvent } from "react"
import { Close } from "ui/Close"
import style from "./index.module.sass"

interface IModal {
  isOpen: boolean
  handlerClose: () => void
}

export const Modal: FC<PropsWithChildren & IModal> = ({
  children,
  isOpen,
  handlerClose,
}) => {
  
  const handlerInnerClick = (e:SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className={style.modal} onClick={handlerClose}>
      <div onClick={handlerInnerClick} className={style.modal__content}>
        <header className={style.modal__header}>
          <div className="flex">
            <div className="flex-auto">header</div>
            <button onClick={handlerClose}>X</button>
          </div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}

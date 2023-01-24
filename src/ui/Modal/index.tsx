import { FC, PropsWithChildren, SyntheticEvent } from "react"
import style from "./index.module.sass"

interface IModal {
  isOpen: boolean
  handlerClose: () => void
  title: string
}

export const Modal: FC<PropsWithChildren & IModal> = ({
  children,
  isOpen,
  handlerClose,
  title
}) => {
  const handlerInnerClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className={style.modal} onClick={handlerClose}>
      <div onClick={handlerInnerClick} className={style.modal__content}>
        <header className={style.modal__header}>
          <div className="flex items-center">
            <div className="flex-auto">{title}</div>
          </div>
        </header>
        <main className="flex-auto p-4">{children}</main>
      </div>
    </div>
  )
}

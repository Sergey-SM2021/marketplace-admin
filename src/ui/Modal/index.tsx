import { FC, PropsWithChildren } from "react"
import { Close } from "ui/Close"
import style from "./index.module.sass"

interface IModal {
  isOpen: boolean
  setIsOpen: () => void
}

export const Modal: FC<PropsWithChildren & IModal> = ({
  children,
  isOpen,
  setIsOpen,
}) => {
  if (!isOpen) {
    return null
  }
  return (
    <div className={style.modal}>
      <div className={style.modal__content}>
        <header className={style.modal__header}>
          <div className="flex">
            <div className="flex-auto">header</div>
            <div onClick={setIsOpen}>X</div>
          </div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}

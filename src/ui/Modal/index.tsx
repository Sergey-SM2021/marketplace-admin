import style from "./index.module.sass"

import { ReactComponent as Close } from "assets/cancle.svg"
import { type FC, type PropsWithChildren, type SyntheticEvent } from "react"

interface IModal {
  handlerClose?: () => void
  title: string
}

export const Modal: FC<PropsWithChildren & IModal> = ({
  children,
  handlerClose,
  title,
}) => {
  const handlerInnerClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div className={style.modal} onClick={handlerClose}>
      <div onClick={handlerInnerClick} className={style.modal__content}>
        <header className={style.modal__header}>
          <div className="flex items-center">
            <div className="flex-auto text-lg font-medium">{title}</div>
            {(handlerClose != null) && (
              <Close
                className="w-5 h-5 hover:cursor-pointer"
                onClick={handlerClose}
              />
            )}
          </div>
        </header>
        <main className="flex-auto p-4">{children}</main>
      </div>
    </div>
  )
}

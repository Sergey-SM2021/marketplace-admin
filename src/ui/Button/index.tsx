import style from "./Button.module.sass"

import cn from "classnames"
import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react"

interface IСustomButtonProps {
  isDangerous?: boolean
}

type TButton = IСustomButtonProps &
  PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<TButton> = ({ children, isDangerous, ...rest }) => {
  return (
    <button
      onClick={rest.onClick}
      {...rest}
      className={cn(
        isDangerous ? style.button__dangerous : style.button,
        rest.className
      )}>
      {children}
    </button>
  )
}

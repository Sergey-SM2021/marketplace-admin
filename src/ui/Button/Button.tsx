import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react"
import style from "./Button.module.sass"
import cn from 'classnames'

interface IСustomButtonProps {
  isDangerous?: "dangerous"
}

type TButton = IСustomButtonProps & PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<TButton> = ({ children, ...rest }) => {
  
  return (
    <button onClick={rest.onClick} className={cn(rest.isDangerous === "dangerous" ? style.button__dangerous : style.button)} {...rest}>
      {children}
    </button>
  )
}
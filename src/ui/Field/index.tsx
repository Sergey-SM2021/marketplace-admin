import { forwardRef, HTMLProps } from "react"
import cn from "classnames"

interface IField {}

export const Field = forwardRef<
  HTMLInputElement,
  IField & HTMLProps<HTMLInputElement>
>(({ ...rest }, ref) => {
  return (
    <input
      id="inp"
      type="text"
      ref={ref}
      {...rest}
      className={cn(rest.className,"p-1 rounded w-full")}
    />
  )
})

import {forwardRef, HTMLAttributes } from "react"

interface IField {
  title: string
}

export const Field = forwardRef<
  HTMLInputElement,
  IField & HTMLAttributes<HTMLInputElement>
>(({ title, ...rest }, ref) => {
  return (
    <div>
      <label>
        <div>{title}</div>
        <input className="p-1 rounded w-full" type="text" ref={ref} {...rest} />
      </label>
    </div>
  )
})

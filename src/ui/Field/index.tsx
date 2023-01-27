import {forwardRef, HTMLAttributes } from "react"

interface IField {
}

export const Field = forwardRef<
  HTMLInputElement,
  IField & HTMLAttributes<HTMLInputElement>
>(({ ...rest }, ref) => {
  return (
    <div>
      <label>
        <input className="p-1 rounded w-full" type="text" ref={ref} {...rest} />
      </label>
    </div>
  )
})

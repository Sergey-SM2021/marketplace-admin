import { forwardRef, InputHTMLAttributes } from "react"
import { ReactComponent as SearchIcon } from "admin/assets/search.svg"

interface ISearch {}

export const Search = forwardRef<
  HTMLInputElement,
  ISearch & InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <div className="relative w-full">
      <input
        className="bg-gray rounded outline-none px-4 py-2 w-full pr-14"
        ref={ref}
        {...props}
      />
      <SearchIcon className="absolute top-[50%] translate-y-[-50%] right-1 fill-purple h-8 w-8"/>
    </div>
  )
})

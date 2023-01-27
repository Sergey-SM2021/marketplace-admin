import { memo } from "react"
import { navLinks } from "./Header.data"
import { ReactComponent as Profile } from "assets/profile0.svg"

export const Header = memo(() => {
  return (
    <div className="bg-black flex items-center p-4 text-white justify-between flex-row-reverse col-start-2 col-end-3">
      <Profile className="fill-white"/>
      <div className="flex gap-4">
        {navLinks.map(item => (
          <div className="bg-purple rounded px-2 py-1">{item.text}</div>
        ))}
      </div>
    </div>
  )
})
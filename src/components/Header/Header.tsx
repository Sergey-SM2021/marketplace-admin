import { navLinks } from "./Header.data"
import { ReactComponent as Shop } from "assets/goShop.svg"
import { ReactComponent as Profile } from "assets/profile0.svg"
import { memo } from "react"
import { Link } from "react-router-dom"

export const Header = memo(() => {
  return (
    <div className="bg-black flex flex-auto items-center h-16 px-4 text-white justify-between col-start-2 col-end-3">
      <div className="flex gap-8">
        <Link to="/admin/profile">
          <Profile className="fill-white" />
        </Link>
        <Link to="/">
          <Shop className="fill-white" />
        </Link>
      </div>
      <div className="flex gap-4">
        {navLinks.map(item => (
          <Link to={item.link}>
            <button
              key={item.id}
              className="flex items-center border flex gap-2 border-white rounded px-2 py-1 hover:bg-purple transition">
              {item.text}
              {item.icon}
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
})

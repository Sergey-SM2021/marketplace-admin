import { Button, Subtitle } from "ui"

import { FC } from "react"
import { NavLink, useNavigate } from "react-router-dom"

interface IHeader {
  productName: string
}

export const Header: FC<IHeader> = ({ productName }) => {
  const nav = useNavigate()
  const handlerBack = () => {
    nav(-1)
  }
  return (
    <div className="flex gap-4 items-end mb-4">
      <Button onClick={handlerBack}>back</Button>
      <div>
        <Subtitle>{productName}</Subtitle>
        <div className="text-dark-gray font-bold">
          <NavLink to={"/"} className="text-[#888] hover:text-[#333] font-bold">
            электроника
          </NavLink>
          <span className="text-[#888]">/</span>
          <NavLink to={"/"} className="text-[#888] hover:text-[#333] font-bold">
            ноутбуки
          </NavLink>
          <span className="text-[#888]">/</span>
          <NavLink to={"/"} className="text-[#888] hover:text-[#333] font-bold">
            asermodel8291738_3782gryu...
          </NavLink>
        </div>
      </div>
    </div>
  )
}

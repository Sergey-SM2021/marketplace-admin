import { $productStore, getProductById } from "./store/store"

import { Counter } from "./components/Counter"
import { FullMedia } from "./components/FullMedia"
import { Slider } from "./components/Slider"

import { Button, Subtitle } from "admin/ui"

import { useStore } from "effector-react"
import { FC, useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"

interface IProduct {}

export const Product: FC<IProduct> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { name, info } = useStore($productStore)
  useEffect(() => {
    getProductById(78)
  }, [])
  const handlerScaleing = () => {
    setIsOpen(true)
  }
  const handlerUnScaleing = () => {
    setIsOpen(false)
  }
  return (
    <>
      {isOpen ? <FullMedia onClose={handlerUnScaleing} /> : null}
      <div className="bg-white w-1/2 min-h-full p-4">
        <Subtitle>{name}</Subtitle>
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
        <Slider onScaleing={handlerScaleing} />
        <Counter />
        <Button isDangerous={true}>Edit</Button>
        <div>{info}</div>
      </div>
    </>
  )
}

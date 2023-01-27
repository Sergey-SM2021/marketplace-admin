import { ReactComponent as Burger } from "assets/burger.svg"
import { FC, memo, useState } from "react"

interface ISidebar {}

export const Sidebar: FC<ISidebar> = memo(() => {
  const [isOpen, setIsOpen] = useState(true)
  const handlerBurgerClick = () => {
    setIsOpen(prev => !prev)
  }
  return (
    <div className="">
      <div
        className="h-16 bg-black flex items-center justify-center hover:cursor-pointer transition hover:bg-opacity-90"
        onClick={handlerBurgerClick}>
        <Burger className="fill-white" />
      </div>
      {isOpen && <div className="p-4 bg-white h-full w-80">kontent</div>}
    </div>
  )
})

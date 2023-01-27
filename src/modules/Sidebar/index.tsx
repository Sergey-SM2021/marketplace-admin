import { ReactComponent as Burger } from "assets/burger.svg"
import { FC, memo, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "ui"
import { FilterByRegularName } from "./components/SearchByProductName"
import { FilterByRating } from "./components/FilterByRating"
import { FilterByPrice } from "./components/FilterByPrice"

interface ISidebar {}

export const Sidebar: FC<ISidebar> = memo(() => {
  const { categoryId } = useParams()
  const [isOpen, setIsOpen] = useState(true)

  const handlerBurgerClick = () => {
    setIsOpen(prev => !prev)
  }

  if (!categoryId) {
    return null
  }

  return (
    <div>
      <div
        className="h-16 bg-black flex items-center justify-center hover:cursor-pointer transition hover:bg-opacity-90"
        onClick={handlerBurgerClick}>
        <Burger className="fill-white" />
      </div>
      {isOpen && (
        <div className="p-4 bg-white h-full w-80 flex flex-col gap-4">
          <div className="flex-auto flex flex-col gap-4">
            <FilterByRegularName />
            <FilterByPrice />
            <div>attributes</div>
            <FilterByRating/>
          </div>
          <Button>filter</Button>
        </div>
      )}
    </div>
  )
})

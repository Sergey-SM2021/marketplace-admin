import style from "./style.module.sass"

import { ReactComponent as Burger } from "assets/burger.svg"
import { FC, memo, useState } from "react"

interface ISidebar {
}

export const Sidebar: FC<ISidebar> = memo(() => {
  const [isOpen, setIsOpen] = useState(true)
  if(isOpen){
    return <div className={style.sidebar}>
    <div className="h-20 bg-black flex items-center justify-center hover:cursor-pointer hover:opacity-90">
      <Burger className="fill-white" onClick={() => {setIsOpen(prev => !prev)}}/>
    </div>
  </div> 
  }
  return null
})

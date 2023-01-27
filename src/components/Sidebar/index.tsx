import { memo } from "react"
import style from "./style.module.sass"
import {ReactComponent as Burger} from "assets/burger.svg"

export const Sidebar = memo(() => {
  return (
    <div className={style.sidebar}>
      <div className="h-20 bg-black flex items-center justify-center">
        <Burger className="fill-white"/>
      </div>
    </div>
  )
})

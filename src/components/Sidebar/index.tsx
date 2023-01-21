import { memo } from "react"
import style from "./style.module.sass"

const links = ["products"]

export const Sidebar = memo(() => {
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar__items}>
        {links.map((link) => (
          <div className={style.sidebar__item}>{link}</div>
        ))}
      </div>
    </div>
  )
})

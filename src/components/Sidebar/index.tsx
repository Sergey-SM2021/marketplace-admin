import { memo } from "react"
import style from "./style.module.sass"

export const Sidebar = memo(() => {
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar__items}>
        {/* {items.map(({ icon, text, id }) => (
          <div key={id} className={style.sidebar__item}>
            <div className={style.sidebar__text}>{text}</div>
            <div className={style.sidebar__icon}>{icon}</div>
          </div>
        ))} */}
      </div>
    </div>
  )
})

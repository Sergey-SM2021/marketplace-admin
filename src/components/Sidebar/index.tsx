import { memo } from "react"
import style from "./style.module.sass"
import { ReactComponent as Items } from "assets/items.svg"
import { ReactComponent as Notes } from "assets/notes.svg"
import { ReactComponent as Settings } from "assets/settings.svg"

const items = [
  { icon: <Items />, text: "Categories" },
  { icon: <Settings />, text: "Settings" },
  { icon: <Notes />, text: "Notifications" },
]

export const Sidebar = memo(() => {
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar__items}>
        {items.map(({ icon, text }) => (
          <div className={style.sidebar__item}>
            <div className={style.sidebar__text}>{text}</div>
            <div className={style.sidebar__icon}>{icon}</div>
          </div>
        ))}
      </div>
    </div>
  )
})

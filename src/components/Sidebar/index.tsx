import { memo } from "react"
import style from "./style.module.sass"
import { ReactComponent as Items } from "assets/items.svg"
import { ReactComponent as Notes } from "assets/notes.svg"
import { ReactComponent as Settings } from "assets/settings.svg"
import { v4 } from "uuid"

const items = [
  { icon: <Items />, text: "Categories", id:v4() },
  { icon: <Settings />, text: "Settings", id:v4() },
  { icon: <Notes />, text: "Notifications", id:v4() },
]

export const Sidebar = memo(() => {
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar__items}>
        {items.map(({ icon, text, id }) => (
          <div key={id} className={style.sidebar__item}>
            <div className={style.sidebar__text}>{text}</div>
            <div className={style.sidebar__icon}>{icon}</div>
          </div>
        ))}
      </div>
    </div>
  )
})

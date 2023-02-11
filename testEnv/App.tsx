import css from "./css.module.css"
import style from "./css.module.scss"
import "./css.css"

import cn from "classnames"

interface IApp {}

export const App = () => {
  return <div className={cn(style.d, css.s)}>App1</div>
}

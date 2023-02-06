import { v4 } from "uuid"
import style from "./index.module.sass"
import cn from "classnames"
import { ReactNode } from "react"

interface IHeader {
    row:Array<ReactNode>
}

export const Header = ({row}: IHeader) => {
  return (
    <thead className={cn(style.table__header, style.headerTable)}>
      <tr className={style.headerTable__row}>
        {row.map((col, index) => (
          <th
            key={v4()}
            className={style.headerTable__col}
            colSpan={index === row.length - 1 ? 2 : 1}>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  )
}

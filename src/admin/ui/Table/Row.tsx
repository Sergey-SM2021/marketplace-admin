import { v4 } from "uuid"

import style from "./index.module.sass"

import cn from "classnames"
import { HTMLProps } from "react"

interface IRow extends HTMLProps<HTMLTableRowElement> {
  onClick: (item: any) => void
  item: { cols: React.ReactNode[]; id: number }
}

export const Row = ({ onClick, item: { id, cols }, ...props }: IRow) => {
  return (
    <tr
      onClick={() => {
        onClick(id)
      }}
      key={v4()}
      className={cn(props, style.bodyTable__row)}>
      {cols.map(value => {
        return (
          <td key={v4()} className={style.bodyTable__col}>
            {value}
          </td>
        )
      })}
    </tr>
  )
}

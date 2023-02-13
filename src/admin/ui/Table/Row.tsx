import { v4 } from "uuid"

import style from "./index.module.sass"

interface IRow {
  onClick: (item: any) => void
  item: { cols: React.ReactNode[]; id: number }
}

export const Row = ({ onClick, item: { id, cols } }: IRow) => {
  return (
    <tr
      onClick={() => {
        onClick(id)
      }}
      key={v4()}
      className={style.bodyTable__row}>
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

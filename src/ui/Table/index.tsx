import { FC } from "react"
import style from "./index.module.sass"
import cn from 'classnames'
import { v4 } from "uuid"

interface ITable {
  HeaderTableRow: Array<React.ReactNode>
  BodyTableRows: Array<Array<React.ReactNode>>
  BodyTableRowClickHandler: (companyId: number) => void
}

export const Table: FC<ITable> = ({
  BodyTableRows,
  BodyTableRowClickHandler,
  HeaderTableRow,
}) => {
  return (
    <table className={style.table}>
      <thead className={cn(style.table__header, style.headerTable)}>
        <tr className={style.headerTable__row}>
          {HeaderTableRow.map((col, index) => (
            <th key={v4()}
              className={style.headerTable__col}
              colSpan={index === (HeaderTableRow.length - 1) ? 2 : 1}
            >
              {col  }
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={cn(style.table__body, style.bodyTable)}>
        {BodyTableRows.map((category) => {
          return (
            <tr
              key={v4()}
              onClick={() => BodyTableRowClickHandler(category[0] as number)}
              className={style.bodyTable__row}
            >
              {category.map((value) => {
                return <td key={v4()} className={style.bodyTable__col}>{value}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

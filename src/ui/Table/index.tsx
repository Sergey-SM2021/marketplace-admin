import { FC } from "react"
import style from "./index.module.sass"
import cn from 'classnames'

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
            <th
              className={style.headerTable__col}
              colSpan={index === HeaderTableRow.length - 1 ? 2 : 1}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={cn(style.table__body, style.bodyTable)}>
        {BodyTableRows.map((category) => {
          return (
            <tr
              onClick={() => BodyTableRowClickHandler(category[0] as number)}
              className={style.bodyTable__row}
            >
              {category.map((value) => {
                return <td className={style.bodyTable__col}>{value}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

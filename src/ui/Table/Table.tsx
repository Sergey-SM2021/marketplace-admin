import { Header } from "./Header"
import { Row } from "./Row"
import style from "./index.module.sass"

import cn from "classnames"
import { type FC } from "react"

export interface ITable {
  HeaderTableRow: React.ReactNode[]
  BodyTableRows: Array<{ cols: React.ReactNode[]; id: number }>
  BodyTableRowClickHandler: (companyId: number) => void
}

export const Table: FC<ITable> = ({
  BodyTableRows,
  BodyTableRowClickHandler,
  HeaderTableRow,
}) => {
  return (
    <table className={style.table}>
      <Header row={HeaderTableRow} />
      <tbody className={cn(style.table__body, style.bodyTable)}>
        {BodyTableRows.map(row => (
          <Row item={row} onClick={BodyTableRowClickHandler} />
        ))}
      </tbody>
    </table>
  )
}

import { Header } from "./Header"
import { Row } from "./Row"
import style from "./index.module.sass"

import cn from "classnames"
import { FC } from "react"

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
      <Header row={HeaderTableRow} />
      <tbody className={cn(style.table__body, style.bodyTable)}>
        {BodyTableRows.map(category => (
          <Row
            item={{ id: Math.random(), cols: category }}
            onClick={BodyTableRowClickHandler}
          />
        ))}
      </tbody>
    </table>
  )
}

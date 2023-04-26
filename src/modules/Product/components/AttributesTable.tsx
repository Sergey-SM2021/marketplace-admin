import { ITable, Table } from "ui"

import { FC } from "react"

interface IAttributesTable extends ITable {}

export const AttributesTable: FC<IAttributesTable> = ({
  BodyTableRowClickHandler,
  BodyTableRows,
  HeaderTableRow,
}) => {
  return (
    <div>
      <Table
        BodyTableRowClickHandler={BodyTableRowClickHandler}
        BodyTableRows={BodyTableRows}
        HeaderTableRow={HeaderTableRow}
      />
    </div>
  )
}

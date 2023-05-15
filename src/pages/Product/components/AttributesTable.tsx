import { type ITable, Table } from "ui"

import { type FC } from "react"

type IAttributesTable = ITable

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

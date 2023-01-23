import style from "./index.module.sass"
import { Table } from "ui/Table"
import { useState } from "react"
import { Product } from "entity/models/Product"
import { Link } from "react-router-dom"
import { Button } from "ui/Button/Button"
const item: Product = {
  category: {},
  categoryId: 98,
  features: [],
  id: 686,
  info: "info is hjsbcjhdsbcjd",
  name: "name",
  price: 67567,
  rating: 5,
}

export const Items = () => {
  const headerRow = [
    "id",
    "name",
    "rating",
    "price",
    "info",
    "category",
    "action",
  ]

  const [RowsToMap, setBodyRows] = useState<Array<Product>>(
    new Array(10).fill(item)
  )

  const BodyRows = RowsToMap.map((row) => {
    const { category, categoryId, features, id, info, name, price, rating } =
      row
    return [id, name, rating, price, info, <Link to={"(category!.name)?.toString()"}>{"category?.name"}</Link>, <Button isDangerous={"dangerous"}>delete</Button>, <Button>edit</Button>]
  })

  return (
    <div className="p-4 min-h-screen">
      <h1 className={style.content__title}>Items</h1>
      <Table
        BodyTableRowClickHandler={(id) => {
          console.log(id)
        }}
        BodyTableRows={BodyRows}
        HeaderTableRow={headerRow}
      />
    </div>
  )
}

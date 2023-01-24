import style from "./index.module.sass"
import { Table } from "ui/Table"
import { useState } from "react"
import { Product } from "entity/models/Product"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "ui/Button/Button"
import { Modal } from "ui/Modal"

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
  const nav = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [RowsToMap, setBodyRows] = useState<Array<Product>>(
    new Array(10).fill(item)
  )

  const handlerClose = () => {
    setIsModalOpen(true)
  }

  const headerRow = [
    "id",
    "name",
    "rating",
    "price",
    "info",
    "category",
    "action",
  ]

  const BodyRows = RowsToMap.map((row) => {
    const { category, categoryId, features, id, info, name, price, rating } =
      row
    return [
      id,
      name,
      rating,
      price,
      info,
      <Link to={"(category!.name)?.toString()"}>{"category?.name"}</Link>,
      <Button isDangerous={"dangerous"} onClick={handlerClose}>
        delete
      </Button>,
      <Button onClick={handlerClose}>edit</Button>,
    ]
  })

  const handlerBackClick = () => {
    nav(-1)
  }

  return (
    <div className="p-4 w-full min-h-screen gap-4 flex flex-col items-start">
      <Modal title="title" isOpen={isModalOpen} handlerClose={() => setIsModalOpen(false)} />
      <div className="flex gap-4 flex-row-reverse items-center">
        <h1 className={style.content__title}>Items</h1>
        <Button onClick={handlerBackClick} isDangerous={"dangerous"}>
          Back
        </Button>
      </div>
      <Table
        BodyTableRowClickHandler={(id) => {
          console.log(id)
        }}
        HeaderTableRow={headerRow}
        BodyTableRows={BodyRows}
      />
    </div>
  )
}

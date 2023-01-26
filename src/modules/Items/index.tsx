import style from "./index.module.sass"
import { Table } from "ui/Table"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "ui/Button/Button"
import { Modal } from "ui/Modal"
import { Title } from "ui/Title"
import { useStore } from "effector-react"
import { $products, getProducts } from "./store"

export const Items = () => {
  const {categoryId} = useParams()
  
  useEffect(()=>{
    getProducts(`http://shopshop.somee.com/Shop/GetProductById?Id=12`)
  },[])
  const RowsToMap = useStore($products)
  const nav = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      <Button isDangerous={true} onClick={handlerClose}>
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
       <Title>Products</Title>
        <Button onClick={handlerBackClick} isDangerous={true}>
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

import { Table } from "ui/Table"
import { FC, memo, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "ui/Button/Button"
import { Modal } from "ui/Modal"
import { useStore } from "effector-react"
import { $products, createProduct, getProducts } from "./store"
import { api } from "./api"
import { Add } from "ui/Add"
import { Title } from "ui/Title"
import { CreateNewItem } from "./components/CreateNewItem"
import { Product } from "entity"

export const Items: FC = memo(() => {
  const { categoryId } = useParams()
  const nav = useNavigate()
  const handlerBackClick = () => {
    nav(-1)
  }
  useEffect(() => {
    getProducts(api.getProducts)
  }, [])
  const { categoryName, products } = useStore($products)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlerModalOpen = () => {
    setIsModalOpen(true)
  }

  const handlerModalClose = () => {
    setIsModalOpen(false)
  }

  const handlerAddItem = () => {
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

  const handlerCreateProduct = (product:Product) => {
    createProduct({url:api.createProduct,payload:product})
  }

  const BodyRows = products.map(row => {
    const { category, categoryId, features, id, info, name, price, rating } =
      row
    return [
      id,
      name,
      rating,
      price,
      info,
      <Link to={"(category!.name)?.toString()"}>{"category?.name"}</Link>,
      <Button isDangerous={true} onClick={handlerModalOpen}>
        delete
      </Button>,
      <Button onClick={handlerModalOpen}>edit</Button>,
    ]
  })

  return (
    <div className="p-4 w-full min-h-screen gap-4 flex flex-col items-start">
      <Modal
        title="Создать новый товар"
        isOpen={isModalOpen}
        handlerClose={() => setIsModalOpen(false)}>
        <CreateNewItem
          handlerCreateProduct={handlerCreateProduct}
          handlerClose={handlerModalClose}
        />
      </Modal>
      <div className="flex gap-4 flex-row-reverse items-center">
        <Add handlerAdd={handlerAddItem} />
        <Title>
          Products from {categoryName} [ {categoryId} ]{" "}
        </Title>
        <Button onClick={handlerBackClick} isDangerous>
          Back
        </Button>
      </div>
      <Table
        BodyTableRowClickHandler={id => {
          console.log(id)
        }}
        HeaderTableRow={headerRow}
        BodyTableRows={BodyRows}
      />
    </div>
  )
})

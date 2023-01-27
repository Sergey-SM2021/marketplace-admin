import { Table } from "ui/Table"
import { FC, memo, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "ui/Button/Button"
import { Modal } from "ui/Modal"
import { useStore } from "effector-react"
import { $products, createProduct, getProductById, getProducts, removeProduct } from "./store"
import { api } from "./api/api"
import { Add } from "ui/Add"
import { Title } from "ui/Title"
import { CreateNewItem } from "./components/CreateNewItem"
import { Product } from "entity"
import { addNotification } from "modules/Notifications/store"
import { Notifications } from "modules/Notifications"

export const Items: FC = memo(() => {
  const { categoryId } = useParams()
  const nav = useNavigate()
  const handlerBackClick = () => {
    nav(-1)
  }
  useEffect(() => {
    getProducts()
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

  const handlerRemoveProduct = (id: number) => {
    removeProduct(api.removeProduct(id))
  }

  const headerRow = ["id", "name", "rating", "price", "info", "action"]

  const handlerCreateProduct = async (product: Product) => {
    const id = await createProduct(product)
    await getProductById(id)
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
      <Button
        isDangerous={true}
        onClick={() =>
          addNotification({
            text: `вы действительно хотите удалить продукт #${id}?`,
            onAccept: () => handlerRemoveProduct(Number(id)),
          })
        }>
        delete
      </Button>,
      <Button onClick={handlerModalOpen}>edit</Button>,
    ]
  })

  return (
    <div className="p-4 w-full min-h-screen gap-4 flex flex-col items-start">
      <Notifications />
      <Modal
        title="Создать новый товар"
        isOpen={isModalOpen}
        handlerClose={() => setIsModalOpen(false)}>
        <CreateNewItem
          categoryId={Number(categoryId)}
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
        BodyTableRowClickHandler={id => {}}
        HeaderTableRow={headerRow}
        BodyTableRows={BodyRows}
      />
    </div>
  )
})

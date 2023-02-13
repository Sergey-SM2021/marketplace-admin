import { Product } from "entity"

import {
  $products,
  createProduct,
  getProductById,
  removeProduct,
} from "./store"
import { setProducts } from "./store"
import { addNotification } from "admin/modules/Notifications/store"

import { Notifications } from "admin/modules/Notifications"

import { Add, Button, Table, Title } from "admin/ui"

import { useStore } from "effector-react"
import { FC, memo, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

interface IItems {
  initProducts: Array<Product>
}

export const Items: FC<IItems> = memo(({ initProducts }) => {
  useEffect(() => {
    setProducts(initProducts)
  }, [initProducts])
  const { categoryId } = useParams()
  const nav = useNavigate()
  const handlerBackClick = () => {
    nav(-1)
  }
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
    removeProduct(id)
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
      {/* <Modal
        title="Создать новый товар"
        handlerClose={() => setIsModalOpen(false)}>
        <CreateNewItem
          categoryId={Number(categoryId)}
          handlerCreateProduct={handlerCreateProduct}
          handlerClose={handlerModalClose}
        />
      </Modal> */}
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
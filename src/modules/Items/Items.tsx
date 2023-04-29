import { type Product } from "types"

import { Button, Table } from "ui"

import { CreateNewItem } from "./components/CreateNewItem"
import { headerRow } from "./items.data"
import {
  $products,
  createProduct,
  getProductById,
  removeProduct,
  setProducts,
} from "./store"

import { useDisclosure } from "@chakra-ui/react"
import { Notifications } from "App/Providers/Notifications"
import { addNotification } from "App/Providers/Notifications/store"
import { useStore } from "effector-react"
import { type FC, memo, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

interface IItems {
  initProducts: Product[]
}

export const Items: FC<IItems> = memo(({ initProducts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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

  const handlerCreateProduct = async (product: Product) => {
    const id = await createProduct(product)
    await getProductById(id)
  }

  const BodyRows = products.map(row => {
    const { category, categoryId, id, info, name, price, rating } = row
    return {
      cols: [
        <div>{id}</div>,
        <div>{name}</div>,
        <div>{price}</div>,
        <Button
          isDangerous={true}
          onClick={() =>
            addNotification({
              text: `вы действительно хотите удалить продукт #${id}?`,
              onAccept: () => {
                handlerRemoveProduct(Number(id))
              },
            })
          }>
          delete
        </Button>,
      ],
      id: id as number,
    }
  })

  return (
    <div className="p-4 w-full min-h-screen gap-4 flex flex-col items-start">
      <Notifications />
      <CreateNewItem categories={[]} onClose={onClose} isOpen={isOpen} />
      <div className="flex gap-4 flex-row-reverse items-center">
        <Button onClick={onOpen}>Создать новый продукт</Button>
        <Button onClick={handlerBackClick} isDangerous>
          Back
        </Button>
      </div>
      <Table
        BodyTableRowClickHandler={id => {
          nav(`/admin/product/${id}`)
        }}
        HeaderTableRow={headerRow}
        BodyTableRows={BodyRows}
      />
    </div>
  )
})

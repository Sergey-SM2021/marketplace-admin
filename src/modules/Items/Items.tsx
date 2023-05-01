import { type Product } from "types"

import { Table } from "ui"

import { CreateNewItem } from "../../features/createProduct/ui/CreateNewItem"
import { headerRow } from "./items.data"
import { $products, removeProduct, setProducts } from "./store"

import { Button, useDisclosure } from "@chakra-ui/react"
import { Notifications } from "App/Providers/Notifications"
import { addNotification } from "App/Providers/Notifications/store"
import { useStore } from "effector-react"
import {
  type FC,
  memo,
  useEffect,
  type MouseEvent,
} from "react"
import { useNavigate } from "react-router-dom"
import { RemoveProduct } from "features/removeProduct/ui/RemoveProduct"

interface IItems {
  initProducts: Product[]
}

export const Items: FC<IItems> = memo(({ initProducts }) => {
  const create = useDisclosure()
  const remove = useDisclosure()

  useEffect(() => {
    setProducts(initProducts)
  }, [initProducts])

  const nav = useNavigate()

  const handlerBackClick = () => {
    nav(-1)
  }

  const { products } = useStore($products)

  const handlerRemove = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation()
    remove.onOpen()
    addNotification({
      text: `вы действительно хотите удалить продукт #${id}?`,
      onAccept: () => {
        removeProduct(id)
      },
    })
  }

  const handlerEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    create.onOpen()
  }

  const BodyRows = products.map(row => {
    const { id, name, price } = row
    return {
      cols: [
        <div key={65}>{id}</div>,
        <div key={4}>{name}</div>,
        <div key={2}>{price}</div>,
        <Button
          key={1}
          onClick={e => {
            handlerRemove(e, id as number)
          }}>
          delete
        </Button>,
        <Button
          key={9}
          onClick={e => {
            handlerEdit(e)
          }}>
          edit
        </Button>,
      ],
      id: id as number,
    }
  })

  return (
    <div className="p-4 w-full min-h-screen gap-4 flex flex-col items-start">
      <Notifications />
      <CreateNewItem categories={[]} onClose={create.onClose} isOpen={create.isOpen} />
      <div className="flex gap-4 flex-row-reverse items-center">
        <Button onClick={create.onOpen}>Создать новый продукт</Button>
        <Button onClick={handlerBackClick}>Back</Button>
      </div>
      <Table
        BodyTableRowClickHandler={id => {
          nav(`/admin/product/${id}`)
        }}
        HeaderTableRow={headerRow}
        BodyTableRows={BodyRows}
      />
      <RemoveProduct isOpen={remove.isOpen} productId={9} onClose={remove.onClose}/>
    </div>
  )
})

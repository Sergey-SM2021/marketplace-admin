import { type ProductResponseDTO } from "Shared/types"

import { Button, Subtitle } from "ui"

import { AttributesTable } from "./components/AttributesTable"
import { Counter } from "./components/Counter"
import { FullMedia } from "./components/FullMedia"
import { Header } from "./components/Header"
import { Slider } from "./components/Slider"
import { $productStore, getProductById } from "./store/store"

import { useStore } from "effector-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Product = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const product = useStore<ProductResponseDTO | null>($productStore)
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      getProductById(Number(id))
    }
  }, [id])
  const handlerScaleing = () => {
    setIsOpen(true)
  }
  const handlerUnScaleing = () => {
    setIsOpen(false)
  }
  if (!id) {
    return null
  }
  const RenderRow = () =>
    product?.features?.map(el => ({
      cols: [<div>edit</div>, <div>{el.name}</div>, <div>{el.value}</div>],
      id: 9,
    })) != null || []
  const handlerAddMedia = () => {}
  return (
    <>
      {isOpen ? <FullMedia onClose={handlerUnScaleing} /> : null}
      <div className="w-full min-h-full p-4">
        <Header productName={product?.name ?? "name"} />
        <div className="bg-white rounded p-4 grid grid-cols-3 gap-4">
          <Slider onAddMedia={handlerAddMedia} onScaleing={handlerScaleing} />
          <div>
            <div>price: {product?.price}</div>
            <div>id: {product?.id}</div>
            <Counter />
            <div className="grid gap-4 grid-cols-2">
              <Button isDangerous={true}>Edit</Button>
              <Button isDangerous={true}>Remove</Button>
            </div>
          </div>
          <AttributesTable
            BodyTableRowClickHandler={() => {}}
            BodyTableRows={RenderRow()}
            HeaderTableRow={["", "key", "value"]}
          />
          <div>
            <Subtitle>Описание</Subtitle>
            <div>{product?.info}</div>
          </div>
        </div>
      </div>
    </>
  )
}

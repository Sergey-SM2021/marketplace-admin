import { type ProductResponseDTO } from "types"

import { Counter } from "modules/Product/components/Counter"
import { FullMedia } from "modules/Product/components/FullMedia"
import { Header } from "modules/Product/components/Header"
import { Slider } from "modules/Product/components/Slider"

import { $product, getProductById } from "Entity/Product/model/model"

import { Button, Subtitle } from "ui"

import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
} from "@chakra-ui/react"
import { useStore } from "effector-react"
import { type FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

interface IProduct {}

const TH = chakra(Th, {
  baseStyle: {
    background: "#96f",
    color: "#fff",
    _first: { borderRadius: "10px 0 0 10px" },
    _last: { borderRadius: "0 10px 10px 0" },
  },
})

const TD = chakra(Td, {
  baseStyle: {
    background: "#fff",
    color: "#000",
    _first: { borderRadius: "10px 0 0 10px" },
    _last: { borderRadius: "0 10px 10px 0" },
  },
})

export const ProductPage: FC<IProduct> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const product = useStore<ProductResponseDTO | null>($product)

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
          <TableContainer>
            <Table variant="unstyled">
              <Thead>
                <Tr>
                  {["параметры", "значение"].map(el => (
                    <TH key={el}>{el}</TH>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {product?.features?.map(el => (
                  <Tr key={el.featureId}>
                    <TD>{el.name}</TD>
                    <TD>{el.value}</TD>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <div>
            <Subtitle>Описание</Subtitle>
            <div>{product?.info}</div>
          </div>
        </div>
      </div>
    </>
  )
}

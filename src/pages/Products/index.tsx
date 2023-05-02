import { useProducts } from "Entity/Products/hooks/useProducts"

import {
  Button,
  Flex,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  HStack,
  Box,
  useDisclosure,
} from "@chakra-ui/react"
import { CreateProduct } from "features/createProduct/ui/CreateNewItem"
import { EditProduct } from "features/editProduct/ui/editProduct"
import { RemoveProduct } from "features/removeProduct/ui/RemoveProduct"
import { useState, type MouseEvent } from "react"
import { useNavigate } from "react-router-dom"

export const ProductsPage = () => {

  const [productIdToRemove, SetProductIdToRemove] = useState<number|null>(null)
  
  const nav = useNavigate()

  const handlerBackClick = () => {
    nav(-1)
  }

  const create = useDisclosure()

  const remove = useDisclosure()

  const edit = useDisclosure()

  const products = useProducts()

  const handlerRemove = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation()
    SetProductIdToRemove(id)
    remove.onOpen()
  }

  const handlerEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    create.onOpen()
  }

  return (
    <>
      <RemoveProduct
        isOpen={remove.isOpen}
        productId={productIdToRemove}
        onClose={remove.onClose}
      />
      <CreateProduct onClose={create.onClose} isOpen={create.isOpen} />
      <EditProduct onClose={edit.onClose} isOpen={edit.isOpen} />
      <Box p={3}>
        <HStack>
          <Button onClick={handlerBackClick}>Назад</Button>
          <Button onClick={create.onOpen}>Создать новый продукт</Button>
        </HStack>
        <TableContainer>
          <ChakraTable
            variant="simple"
            style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}>
            <Thead>
              <Tr borderRadius={3}>
                <Th
                  color={"white"}
                  background={"purple.400"}
                  style={{ borderRadius: "10px 0 0 10px" }}>
                  id
                </Th>
                <Th background={"purple.400"} color={"white"}>
                  name
                </Th>
                <Th background={"purple.400"} color={"white"}>
                  price
                </Th>
                <Th
                  color={"white"}
                  colSpan={2}
                  background={"purple.400"}
                  style={{ borderRadius: "0 10px 10px 0" }}>
                  <Flex justify={"center"}>action</Flex>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map(product => (
                <Tr key={product.id}>
                  <Td
                    borderRadius={10}
                    background={"white"}
                    style={{ borderRadius: "10px 0 0 10px" }}>
                    {product.id}
                  </Td>
                  <Td background={"white"}>{product.name}</Td>
                  <Td background={"white"}>{product.price}</Td>
                  <Td background={"white"}>
                    <Button
                      onClick={e => {
                        handlerRemove(e, product.id as number)
                      }}>
                      Delete
                    </Button>
                  </Td>
                  <Td
                    background={"white"}
                    style={{ borderRadius: "0 10px 10px 0" }}>
                    <Button onClick={handlerEdit}>Edit</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </ChakraTable>
        </TableContainer>
      </Box>
    </>
  )
}

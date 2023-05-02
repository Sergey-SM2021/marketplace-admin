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
} from "@chakra-ui/react"

interface ITable {
  headerRow: any
  bodyRows: any
}

export const Table = ({ bodyRows, headerRow }: ITable) => {
  const products = useProducts()

  return (
    <TableContainer p={"1em"} mt={"-1em"}>
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
                <Button>Delete</Button>
              </Td>
              <Td
                background={"white"}
                style={{ borderRadius: "0 10px 10px 0" }}>
                <Button>Edit</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  )
}

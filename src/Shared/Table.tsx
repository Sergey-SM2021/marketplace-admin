import { type Category, type Product } from "types"

import {
  Button,
  Table as ChakraTable,
  Flex,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
} from "@chakra-ui/react"
import { RenderCategory } from "modules/Categories/utils"
import { v4 } from "uuid"

interface ITable {
  categories?: Category[]
  products?: Product[]
}

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

export const Table = ({ categories, products }: ITable) => {
  if (categories) {
    return (
      <TableContainer>
        <ChakraTable
          variant="simple"
          style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}>
          <Thead>
            <Tr borderRadius={3}>
              {["","id", "название", "параметры"].map(col => (
                <TH key={col}>{col}</TH>
              ))}
              <TH colSpan={2}>
                <Flex justify={"center"}>Действие</Flex>
              </TH>
            </Tr>
          </Thead>
          <Tbody>
            {categories.}
          </Tbody>
        </ChakraTable>
      </TableContainer>
    )
  }

  if (products) {
    return (
      <TableContainer>
        <ChakraTable
          variant="simple"
          style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}>
          <Thead>
            {[].map(row => (
              <Tr borderRadius={3} key={row}>
                {row.map(col => (
                  <Th
                    key={col}
                    _first={{ borderRadius: "10px 0 0 10px" }}
                    color={"white"}
                    background={"purple.400"}>
                    {col}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {[].map(product => (
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

  throw new Error("Компонент обязан принимать хоть один пропс")
}


{/* {categories.map(category => (
              <RenderCategory key={v4()} category={category} onAddProduct={()=>{}} onClick={()=>{}} onEdit={()=>{}} onRemove={()=>{}}/>
            ))} */}
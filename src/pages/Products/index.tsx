import {
  Button,
  Center,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useProducts } from "Entity/Products/hooks/useProducts"

export const ProductsPage = () => {
  
  const products = useProducts()

  return (
    <TableContainer p={3}>
      <Table variant="unstyled">
        <Thead>
          <Tr background={"purple.500"}>
            <Th>id</Th>
            <Th>name</Th>
            <Th>price</Th>
            <Th colSpan={2}>
              <Flex justify={"center"}>action</Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(product => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.name}</Td>
              <Td>{product.price}</Td>
              <Td><Button>Delete</Button></Td>
              <Td><Button>Edit</Button></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

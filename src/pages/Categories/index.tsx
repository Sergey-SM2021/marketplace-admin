import { useCategoriesTree } from "Entity/Categories/hooks/useCategoriesTree"
import { RenderCategory } from "Entity/Categories/utils"

import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  chakra,
  useDisclosure,
} from "@chakra-ui/react"
import { type FC } from "react"
import { v4 } from "uuid"
import { CreateCategory } from "features/createCategory/ui/createCategory"

const TH = chakra(Th, {
  baseStyle: {
    background: "#96f",
    color: "#fff",
    _first: { borderRadius: "10px 0 0 10px" },
    _last: { borderRadius: "0 10px 10px 0" },
  },
})

export const CategoriesPage: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const categories = useCategoriesTree()

  return (
    <Box p={3}>
      <CreateCategory isOpen={isOpen} onClose={onClose} />
      <Button colorScheme="facebook" onClick={onOpen}>Создать категорию</Button>
      <TableContainer>
        <Table
          variant="simple"
          style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}>
          <Thead>
            <Tr borderRadius={3}>
              {["", "id", "наименование", "парметры"].map(el => (
                <TH key={el}>{el}</TH>
              ))}
              <TH colSpan={2}>
                <Flex justify={"center"}>action</Flex>
              </TH>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map(category => (
              <RenderCategory
                category={category}
                onEdit={() => {}}
                onRemove={() => {}}
                deep={1}
                key={v4()}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

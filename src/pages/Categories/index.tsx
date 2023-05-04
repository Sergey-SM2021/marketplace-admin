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
import { CreateCategory } from "features/createCategory/ui/createCategory"
import { EditCategory } from "features/editCategory/ui/EditCategory"
import { RemoveCategory } from "features/removeCategory/ui/removeCategory"
import { useState, type FC } from "react"
import { v4 } from "uuid"

const TH = chakra(Th, {
  baseStyle: {
    background: "#96f",
    color: "#fff",
    _first: { borderRadius: "10px 0 0 10px" },
    _last: { borderRadius: "0 10px 10px 0" },
  },
})

export const CategoriesPage: FC = () => {
  const create = useDisclosure()
  const edit = useDisclosure()
  const remove = useDisclosure()

  const categories = useCategoriesTree()

  const [RemoveCategoryId, setRemoveCategoryId] = useState<null | number>(null)

  const handlerRemoveCategory = (id: number) => {
    setRemoveCategoryId(id)
    remove.onOpen()
  }

  return (
    <Box p={3}>
      <RemoveCategory
        categoryId={RemoveCategoryId as number}
        isOpen={remove.isOpen}
        onClose={remove.onClose}
      />
      <EditCategory isOpen={edit.isOpen} onClose={edit.onClose} />
      <CreateCategory isOpen={create.isOpen} onClose={create.onClose} />
      <Button colorScheme="facebook" onClick={create.onOpen}>
        Создать категорию
      </Button>
      <TableContainer>
        <Table
          variant="unstyled"
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
                onEdit={edit.onOpen}
                onRemove={handlerRemoveCategory}
                deep={0}
                key={v4()}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

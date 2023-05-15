import { useCategoriesTree } from "Entity/CategoriesTree/hooks/useCategoriesTree"
import { RenderCategory } from "Entity/CategoriesTree/utils"
import { ParamsManager } from "Entity/Params/ui/ParamsManager/ParamsManager"

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
import { type Category } from "Shared/types"
import { EditCategory } from "features/editCategory/ui/editCategory"
import { RemoveCategory } from "features/removeCategory/ui/removeCategory"
import { useState, type FC } from "react"

const TH = chakra(Th, {
  baseStyle: {
    background: "#96f",
    color: "#fff",
    _first: { borderRadius: "10px 0 0 10px" },
    _last: { borderRadius: "0 10px 10px 0" },
  },
})

const CategoriesPage: FC = () => {
  const create = useDisclosure()
  const edit = useDisclosure()
  const remove = useDisclosure()

  const categories = useCategoriesTree()

  const [RemoveCategoryId, setRemoveCategoryId] = useState<null | number>(null)

  const [editCategory, setEditCategory] = useState<null | Category>(null)

  const handlerRemoveCategory = (id: number) => {
    setRemoveCategoryId(id)
    remove.onOpen()
  }

  const handlerEditCategory = (category: Category) => {
    setEditCategory(category)
    edit.onOpen()
  }

  return (
    <Flex flexDirection={"column"} flex={"1 1 auto"} p={3}>
      <RemoveCategory
        categoryId={RemoveCategoryId as number}
        isOpen={remove.isOpen}
        onClose={remove.onClose}
      />
      {create.isOpen ? (
        <EditCategory
          method="POST"
          title="Создать Категорию"
          isOpen={create.isOpen}
          onClose={create.onClose}
        />
      ) : null}
      {edit.isOpen ? (
        <EditCategory
          method="PUT"
          category={editCategory}
          title="Редактировать категорию"
          isOpen={edit.isOpen}
          onClose={edit.onClose}
        />
      ) : null}
      <Box>
        <Button colorScheme="facebook" onClick={create.onOpen}>
          Создать категорию
        </Button>
      </Box>
      <Flex gap={3} flexGrow={"1"}>
        <TableContainer flexGrow={1}>
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
                  onEdit={handlerEditCategory}
                  onRemove={handlerRemoveCategory}
                  deep={0}
                  key={category.id}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <ParamsManager />
      </Flex>
    </Flex>
  )
}

export default CategoriesPage

import { type Feature, type Category } from "types"

import { useCategoriesTree } from "Entity/CategoriesTree/hooks/useCategoriesTree"
import { RenderCategory } from "Entity/CategoriesTree/utils"
import { useParams } from "Entity/Params/hooks/useParams"
import { createParam } from "Entity/Params/store/params"

import {
  Box,
  Button,
  CloseButton,
  Flex,
  Grid,
  HStack,
  Input,
  Table,
  TableContainer,
  Tag,
  TagCloseButton,
  TagLabel,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack,
  chakra,
  useDisclosure,
} from "@chakra-ui/react"
import { EditCategory } from "features/editCategory/ui/editCategory"
import { RemoveCategory } from "features/removeCategory/ui/removeCategory"
import { useState, type FC, type FormEvent } from "react"
import { v4 } from "uuid"

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

  const [currentParam, setCurrentParam] = useState<Feature | undefined>()

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

  const params = useParams()

  const [paramName, setParamName] = useState<string>("")

  const filterFeatures = (e: FormEvent<HTMLInputElement>) => {
    setParamName(e.currentTarget.value)
  }

  const handlerCreateParam = () => {
    createParam(paramName)
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
                  key={v4()}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <VStack bg={"white"} mt={"1em"} mb={"1em"} p={3} borderRadius={5}>
          <HStack>
            <CloseButton />
            <Input value={paramName} onChange={filterFeatures} />
            <Button onClick={handlerCreateParam}>add</Button>
          </HStack>
          <Grid
            templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
            w={"full"}
            gap={6}>
            {params.map(p => (
              <Box key={p.id}>
                <Tag
                  size={"lg"}
                  _hover={{ cursor: "grab" }}
                  draggable
                  onDragStart={() => {
                    setCurrentParam(p)
                  }}>
                  <TagLabel>{p.name}</TagLabel>
                  <TagCloseButton />
                </Tag>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Flex>
    </Flex>
  )
}

export default CategoriesPage

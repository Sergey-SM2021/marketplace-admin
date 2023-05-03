import { type Category } from "types"

import { Flex, Td, Th, chakra, Button } from "@chakra-ui/react"
import { ReactComponent as Collapse } from "assets/collapse.svg"
import { type MouseEvent, type SyntheticEvent, useState } from "react"
import { v4 } from "uuid"

interface IRenderCategory {
  category: Category
  onClick: (id: number) => void
  onRemove: (id: number) => void
  onEdit: () => void
  onAddProduct: (id: number) => void
  deep?: number
}

const TD = chakra(Td, {
  baseStyle: {
    background: "#fff",
    color: "#000",
    _first: { borderRadius: "10px 0 0 10px" },
    _last: { borderRadius: "0 10px 10px 0" },
  },
})

export const RenderCategory = (props: IRenderCategory) => {

  const { category, onClick, onEdit, onRemove, onAddProduct, deep = 0 } = props

  const [isOpen, SetIsOpen] = useState(false)

  const handlerRowClick = () => {
    onClick(category.id!)
  }

  const handlerRemove = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation()
    onRemove(id)
  }

  const handlerEdit = (e: SyntheticEvent) => {
    e.stopPropagation()
    onEdit()
  }

  const handlerAddProduct = (e: SyntheticEvent) => {
    e.stopPropagation()
    onAddProduct(category.id!)
  }

  const { name, id, features, parentCategory, parentCategoryId, products } =
    category

  return (
    <>
      <tr>
        {category.childCategories?.length ? (
          <TD>
            <Collapse
              style={{ marginLeft: deep * 30 }}
              className={`hover:cursor-pointer bg-purple-transparent transition rounded-full ${
                isOpen ? "rotate-90" : "rotate-0"
              }`}
              onClick={e => {
                SetIsOpen(prev => !prev)
              }}
            />
          </TD>
        ) : (
          <TD></TD>
        )}
        {[id, name].map(el => (
          <TD key={v4()}>{el}</TD>
        ))}
        <TD>
          <Flex gap={3}>
            {category.features?.map(f => (
              <Button>{f.name}</Button>
            ))}
          </Flex>
        </TD>
        <TD>
          <Button
            onClick={e => {
              handlerRemove(e, id!)
            }}>
            remove
          </Button>
        </TD>
        <TD>
          <Button onClick={handlerEdit}>edit</Button>
        </TD>
      </tr>
      {isOpen
        ? category?.childCategories?.map(el => (
            <RenderCategory {...props} key={v4()} category={el} />
          ))
        : null}
    </>
  )
}

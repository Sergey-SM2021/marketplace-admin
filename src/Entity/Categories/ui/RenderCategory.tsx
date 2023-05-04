import { type Category } from "types"

import { Flex, Td, chakra, Button, Badge } from "@chakra-ui/react"
import { ReactComponent as Collapse } from "assets/collapse.svg"
import { type SyntheticEvent, useState } from "react"
import { v4 } from "uuid"

interface IRenderCategory {
  category: Category
  onRemove: (id: number) => void
  onEdit: () => void
  deep: number
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
  const { category, onEdit, deep, onRemove } = props

  const [isOpen, SetIsOpen] = useState(false)

  const handlerEdit = (e: SyntheticEvent) => {
    e.stopPropagation()
    onEdit()
  }

  const { name, id } = category

  return (
    <>
      <tr style={{ height: "100%" }}>
        {category.childCategories?.length ? (
          <Td
            style={{
              padding: 0,
              margin: 0,
              height: "100%",
            }}>
            <Flex
              align={"center"}
              justify={"center"}
              style={{
                marginLeft: deep * 10,
                width: "100%",
                height: "100%",
                background: "#fff",
                borderRadius: "10px 0 0 10px",
              }}>
              <Collapse
                className={`hover:cursor-pointer bg-purple-transparent transition rounded-full ${
                  isOpen ? "rotate-90" : "rotate-0"
                }`}
                onClick={e => {
                  SetIsOpen(prev => !prev)
                }}
              />
            </Flex>
          </Td>
        ) : (
          <Td
            style={{
              padding: 0,
              margin: 0,
              height: "100%",
            }}>
            <Flex
              align={"center"}
              justify={"center"}
              style={{
                marginLeft: deep * 10,
                width: "100%",
                height: "100%",
                background: "#fff",
                borderRadius: "10px 0 0 10px",
              }}></Flex>
          </Td>
        )}
        {[id, name].map(el => (
          <TD key={v4()}>{el}</TD>
        ))}
        <TD>
          <Flex gap={3}>
            {category.features?.map(f => (
              <Badge colorScheme="green" key={v4()}>
                {f.name}
              </Badge>
            ))}
          </Flex>
        </TD>
        <TD>
          <Button
            colorScheme="facebook"
            onClick={() => {
              onRemove(id)
            }}>
            remove
          </Button>
        </TD>
        <TD>
          <Button onClick={handlerEdit} colorScheme="facebook">
            edit
          </Button>
        </TD>
      </tr>
      {isOpen
        ? category?.childCategories?.map(el => (
            <RenderCategory
              {...props}
              key={v4()}
              deep={deep + 5}
              category={el}
            />
          ))
        : null}
    </>
  )
}

import { type Category } from "types"

import { Button } from "ui"
import { Row } from "ui/Table/Row"

import { ReactComponent as Collapse } from "assets/collapse.svg"
import { type MouseEvent, type SyntheticEvent, useState } from "react"

interface IRenderCategory {
  category: Category
  onClick: (id: number) => void
  onRemove: (id: number) => void
  onEdit: () => void
  onAddProduct: (id: number) => void
  deep?: number
}

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

  const row = [
    category.childCategories?.length ? (
      <Collapse
        style={{ marginLeft: deep * 30 }}
        className={`hover:cursor-pointer bg-purple-transparent transition rounded-full ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
        onClick={e => {
          SetIsOpen(prev => !prev)
        }}
      />
    ) : null,
    id,
    name,
    <div className="flex gap-3 justify-center">
      {category.features?.map(f => (
        <Button>{f.name}</Button>
      ))}
    </div>,
    <Button onClick={e => { handlerRemove(e, id!); }}>remove</Button>,
    <Button isDangerous={true} onClick={handlerEdit}>
      edit
    </Button>
  ]

  if ((category.childCategories != null) && (category.childCategories.length > 0) && isOpen) {
    return (
      <>
        <Row item={{ cols: row, id: id as number }} onClick={() => {}} />
        {category.childCategories.map(el => (
          <RenderCategory {...props} category={el} />
        ))}
      </>
    )
  }
  return <Row item={{ cols: row, id: id as number }} onClick={() => {}} />
}

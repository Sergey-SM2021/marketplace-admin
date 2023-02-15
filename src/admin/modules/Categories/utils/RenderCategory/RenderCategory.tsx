import { Category } from "entity"

import { Button } from "admin/ui"
import { Row } from "admin/ui/Table/Row"

import { ReactComponent as Collapse } from "admin/assets/collapse.svg"
import { SyntheticEvent, useState } from "react"

interface IRenderCategory {
  category: Category
  onClick: (id: number) => void
  onRemove: () => void
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

  const handlerRemove = (e: SyntheticEvent) => {
    e.stopPropagation()
    onRemove()
  }

  const handlerEdit = (e: SyntheticEvent) => {
    e.stopPropagation()
    onEdit()
  }

  const handlerAddProduct = (e: SyntheticEvent) => {
    e.stopPropagation()
    onAddProduct(category.id!)
  }

  const {
    name,
    id,
    features,
    parentCategory,
    parentCategoryId,
    products,
  } = category

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
    "Здесь должно быть кол-во продуктов",
    <Button onClick={handlerRemove}>remove</Button>,
    <Button isDangerous={true} onClick={handlerEdit}>
      edit
    </Button>,
    category.childCategories?.length ? (
      <Button isDangerous onClick={e => handlerAddProduct(e)}>
        Create Product
      </Button>
    ) : null,
  ]

  if (category.childCategories && category.childCategories.length && isOpen) {
    return (
      <>
        <Row item={{ cols: row, id: id as number }} onClick={() => {}} />
        {category.childCategories!.map(el => (
          <RenderCategory {...props} category={el} />
        ))}
      </>
    )
  }
  return <Row item={{ cols: row, id: id as number }} onClick={() => {}} />
}

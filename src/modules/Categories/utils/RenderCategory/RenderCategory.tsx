import {
  HideChilds,
  ILocalCategory,
  ShowChilds,
} from "modules/Categories/store/store"

import { Button } from "ui"
import { Row } from "ui/Table/Row"

import { ReactComponent as Collapse } from "assets/collapse.svg"
import { FC, memo, SyntheticEvent } from "react"

interface IRenderCategory {
  category: ILocalCategory
  onClick: (id: number) => void
  onRemove: () => void
  onEdit: () => void
  onAddProduct: (id: number) => void
}

export const RenderCategory: FC<IRenderCategory> = memo(
  ({ category, onClick, onEdit, onRemove, onAddProduct }) => {
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

    const { name, id, childCategories, isOpen } = category

    const row = [
      category.childCategories?.length ? (
        <Collapse
          className={`hover:cursor-pointer bg-purple-transparent transition rounded-full ${
            category.isOpen ? "rotate-90" : "rotate-0"
          }`}
          onClick={e => {
            if (category.isOpen) {
              e.stopPropagation()
              HideChilds(id!)
            } else {
              ShowChilds(id!)
              e.stopPropagation()
            }
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
      <Button isDangerous onClick={e => handlerAddProduct(e)}>
        Create Product
      </Button>,
    ]

    // рекурсивный Render категорий with children,
    // которые в открытом state
    if (childCategories?.length && isOpen) {
      return (
        <>
          <Row
            item={{ cols: row, id: category.id! }}
            onClick={handlerRowClick}
          />
          {childCategories?.map(c => (
            <RenderCategory
              category={c}
              onClick={handlerRowClick}
              onEdit={onEdit}
              onRemove={onRemove}
              onAddProduct={onAddProduct}
            />
          ))}
        </>
      )
    }

    // рекурсивный Render категорий with out children,
    // or в close state
    return (
      <Row item={{ cols: row, id: category.id! }} onClick={handlerRowClick} />
    )
  }
)

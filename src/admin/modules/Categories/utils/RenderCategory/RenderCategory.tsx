import {
  HideChilds,
  ILocalCategory,
  ShowChilds,
} from "admin/modules/Categories/store/store"

import { Button } from "admin/ui"
import { Row } from "admin/ui/Table/Row"

import { ReactComponent as Collapse } from "admin/assets/collapse.svg"
import { FC, memo, SyntheticEvent } from "react"

interface IRenderCategory {
  category: ILocalCategory
  onClick: (id: number) => void
  onRemove: () => void
  onEdit: () => void
  onAddProduct: (id: number) => void
  deep?: number
}

export const RenderCategory: FC<IRenderCategory> = memo(
  ({ category, onClick, onEdit, onRemove, onAddProduct, deep = 0 }) => {
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
          style={{ marginLeft: deep * 30 }}
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
      !childCategories.length ? (
        <Button isDangerous onClick={e => handlerAddProduct(e)}>
          Create Product
        </Button>
      ) : null,
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
              deep={deep + 1}
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

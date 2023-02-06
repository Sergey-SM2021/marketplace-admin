import { HideChilds, ILocalCategory, ShowChilds } from "modules/store/store"

import { Button } from "ui"
import { Row } from "ui/Table/Row"

import { FC, memo, SyntheticEvent } from "react"

interface IRenderCategory {
  category: ILocalCategory
  onClick: (id: number) => void
  onRemove: () => void
  onEdit: (e:SyntheticEvent) => void
}

export const RenderCategory: FC<IRenderCategory> = memo(
  ({ category, onClick, onEdit, onRemove }) => {
    const handlerRowClick = () => {
      onClick(category.id!)
    }

    const { name, id, childCategories, isOpen } = category

    const row = [
      category.childCategories?.length ? (
        <Button
          isDangerous={category.isOpen}
          onClick={e => {
            if (category.isOpen) {
              e.stopPropagation()
              HideChilds(id!)
            } else {
              ShowChilds(id!)
              e.stopPropagation()
            }
          }}>
          Смотреть
        </Button>
      ) : null,
      id,
      name,
      category.products?.length,
      <Button>remove</Button>,
      <Button isDangerous={true}>edit</Button>,
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

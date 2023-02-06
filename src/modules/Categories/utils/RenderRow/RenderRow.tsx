import { HideChilds, ILocalCategory, ShowChilds } from "modules/store/store"

import { Button } from "ui"
import { v4 } from "uuid"

import style from "./index.module.sass"

import { FC } from "react"

interface IRenderRow {
  category: ILocalCategory
  onClick: (id: number) => void
}

// FIXME: rename to RenderCat
export const RenderRow: FC<IRenderRow> = ({ category, onClick }) => {
  const handlerClick = () => {
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
        <tr key={v4()} className={style.bodyTable__row} onClick={handlerClick}>
          {row.map(value => {
            return (
              <td key={v4()} className={style.bodyTable__col}>
                {value}
              </td>
            )
          })}
        </tr>
        {childCategories?.map(c => (
          <RenderRow category={c} onClick={handlerClick} />
        ))}
      </>
    )
  }

  // рекурсивный Render категорий with out children, 
  // or в close state
  return (
    <tr key={v4()} className={style.bodyTable__row} onClick={handlerClick}>
      {row.map(value => {
        return (
          <td key={v4()} className={style.bodyTable__col}>
            {value}
          </td>
        )
      })}
    </tr>
  )
}

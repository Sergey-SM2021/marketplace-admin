import { HideChilds, ILocalCategory, ShowChilds } from "modules/store/store"
import { FC } from "react"
import { Button } from "ui"
import { v4 } from "uuid"
import style from "./index.module.sass"

export const RenderRow: FC<ILocalCategory> = category => {
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

  return childCategories?.length && isOpen ? (
    <>
      <tr key={v4()} className={style.bodyTable__row}>
        {row.map(value => {
          return (
            <td key={v4()} className={style.bodyTable__col}>
              {value}
            </td>
          )
        })}
      </tr>
      {childCategories?.map(c => (
        <RenderRow {...(c as ILocalCategory)} />
      ))}
    </>
  ) : (
    <tr key={v4()} className={style.bodyTable__row}>
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

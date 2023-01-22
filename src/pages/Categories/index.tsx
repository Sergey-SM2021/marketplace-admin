import style from "./index.module.sass"
import cn from "classnames"
import { useState } from "react"
import { Category } from "entity/models/Category"
import { useNavigate } from "react-router-dom"

export const Categories = () => {
  const [categories, setCategories] = useState<Array<Category>>([
    {
      id: 1,
      name: "Смартфоны",
      parentCategoryId: 90,
      parentCategory: {
        name: "Электроника",
      },
    },
  ])

  const rows = categories.map((el) => {
    const { name, id, parentCategory } = el

    return {
      id,
      name,
      parentCategory: parentCategory?.name,
      count: 897,
      remove: <button >remove</button>,
      edit: <button>edit</button>,
    }
  })

  const headerTableCol = ["id", "name", "parentLink", "count", "action"]

  const navigate = useNavigate()

  const handlerRowClick = (categoryId: number) => {
    navigate(`/categories/${categoryId}`)
  }

  return (
    <div className="p-4">
      <h1 className={style.content__title}>Categories</h1>
      <table className={style.table}>
        <thead className={cn(style.table__header, style.headerTable)}>
          <tr className={style.headerTable__row}>
            {headerTableCol.map((col, index) => (
              <th
                className={style.headerTable__col}
                colSpan={index === headerTableCol.length - 1 ? 2 : 1}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn(style.table__body, style.bodyTable)}>
          {rows.map((category) => {
            return (
              <tr
                onClick={() => handlerRowClick(category.id as number)}
                className={style.bodyTable__row}
              >
                {Object.values(category).map((value) => {
                  return <td className={style.bodyTable__col}>{value}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

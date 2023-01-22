import style from "./index.module.sass"
import cn from "classnames"
import React, { FC, SyntheticEvent, useState } from "react"
import { Category } from "entity/models/Category"
import { useNavigate } from "react-router-dom"
import { Button } from "ui/Button/Button"

interface ITable {
  HeaderTableRow:Array<React.ReactNode>,
  BodyTableRows:Array<Object>
  BodyTableRowClickHandler: (companyId:number) => void
}

const Table:FC<ITable> = ({BodyTableRows,BodyTableRowClickHandler,HeaderTableRow}) => {
  return (
    <table className={style.table}>
      <thead className={cn(style.table__header, style.headerTable)}>
        <tr className={style.headerTable__row}>
          {HeaderTableRow.map((col, index) => (
            <th
              className={style.headerTable__col}
              colSpan={index === HeaderTableRow.length - 1 ? 2 : 1}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={cn(style.table__body, style.bodyTable)}>
        {BodyTableRows.map((category) => {
          return (
            <tr
              onClick={()=>BodyTableRowClickHandler(category.id)}
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
  )
}

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

  const handlerEditClick = (e: SyntheticEvent) => {
    e.stopPropagation()
  }

  const handlerRemoveClick = (e: SyntheticEvent) => {
    e.stopPropagation()
  }

  const rows = categories.map((el) => {
    const { name, id, parentCategory } = el

    return {
      id,
      name,
      parentCategory: parentCategory?.name,
      count: 897,
      remove: <Button onClick={handlerRemoveClick}>remove</Button>,
      edit: (
        <Button isDangerous={"dangerous"} onClick={handlerEditClick}>
          edit
        </Button>
      ),
    }
  })

  const headerTableCol = ["id", "name", "parentLink", "count", "action"]

  const navigate = useNavigate()

  const handlerRowClick = (categoryId: number) => {
    navigate(`/categories/${categoryId}`)
  }

  return (
    <div className="p-4 w-full">
      <h1 className={style.content__title}>Categories</h1>
      <Table BodyTableRowClickHandler={handlerRowClick} HeaderTableRow={headerTableCol} BodyTableRows={rows}/>
    </div>
  )
}

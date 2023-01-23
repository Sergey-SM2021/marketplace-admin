import style from "./index.module.sass"
import { SyntheticEvent, useState } from "react"
import { Category } from "entity/models/Category"
import { useNavigate } from "react-router-dom"
import { Button } from "ui/Button/Button"
import { Table } from "ui/Table"

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

  const handlerEditClick = (e: SyntheticEvent, id: number) => {
    e.stopPropagation()
    console.log(id)
    alert("")
  }

  const handlerRemoveClick = (e: SyntheticEvent) => {
    e.stopPropagation()
  }

  const rows = categories.map((el) => {
    const { name, id, parentCategory } = el

    return [
      id,
      name,
      parentCategory?.name,
      896,
      <Button onClick={handlerRemoveClick}>remove</Button>,
      <Button
        isDangerous={"dangerous"}
        onClick={(e) => handlerEditClick(e, id as number)}
      >
        edit
      </Button>,
    ]
  })

  const headerTableCol = ["id", "name", "parentLink", "count", "action"]

  const navigate = useNavigate()

  const handlerRowClick = (categoryId: number) => {
    navigate(`/categories/${categoryId}`)
  }

  return (
    <div className="p-4 w-full min-h-screen">
      <h1 className={style.content__title}>Categories</h1>
      <Table
        BodyTableRowClickHandler={handlerRowClick}
        HeaderTableRow={headerTableCol}
        BodyTableRows={rows}
      />
    </div>
  )
}

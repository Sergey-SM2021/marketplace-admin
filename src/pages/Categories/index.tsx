import style from "./index.module.sass"
import { SyntheticEvent, useState } from "react"
import { Category } from "entity/models/Category"
import { useNavigate } from "react-router-dom"
import { Button } from "ui/Button/Button"
import { Table } from "ui/Table"
import { Modal } from "ui/Modal"
import { Note } from "ui/Note"

const headerTableCol = ["id", "name", "parentLink", "count", "action"]

const Category0 = {
  id: 1,
  name: "Смартфоны",
  parentCategoryId: 90,
  parentCategory: {
    name: "Электроника",
  },
}

export const Categories = () => {
  const [notifications, setNotifications] = useState([
    { id: 90, message: "hi" },
    { id: 67, message: "каляка-моляка" },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [categories, setCategories] = useState<Array<Category>>([Category0])

  const navigate = useNavigate()

  const handlerClose = () => {
    setIsModalOpen(false)
  }

  const handlerEditClick = (e: SyntheticEvent, id: number) => {
    e.stopPropagation()
    console.log(id)
    setIsModalOpen(true)
  }

  const handlerRemoveClick = (e: SyntheticEvent) => {
    e.stopPropagation()
    setNotifications((prev) => [
      ...prev,
      {
        id: Math.random(),
        message: "Вы уверенны, что хотите удалить данную категорию?",
      },
    ])
  }

  const handlerRowClick = (categoryId: number) => {
    navigate(`/categories/${categoryId}`)
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

  return (
    <div className="p-4 w-full min-h-screen">
      {notifications.map((note) => (
        <Note
          onAccept={() => {alert()}}
          message={note.message}
          unMount={() => {
            setNotifications((prev) =>
              prev.filter((item) => item.id !== note.id)
            )
          }}
        />
      ))}
      <Modal handlerClose={handlerClose} isOpen={isModalOpen}></Modal>
      <h1 className={style.content__title}>Categories</h1>
      <Table
        BodyTableRowClickHandler={handlerRowClick}
        HeaderTableRow={headerTableCol}
        BodyTableRows={rows}
      />
    </div>
  )
}

import style from "./index.module.sass"
import { SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "ui/Button/Button"
import { Table } from "ui/Table"
import { Modal } from "ui/Modal"
import { Note } from "ui/Note"
import { headerTableCol } from "./index.data"
import { useStore } from "effector-react"
import { $categories, $notifications, removeCategory } from "./store"
import { addNotification, removeNotification } from "./store"

export const Categories = () => {
  const categories = useStore($categories)
  const notifications = useStore($notifications)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()

  const handlerClose = () => {
    setIsModalOpen(false)
  }

  const handlerEditClick = (e: SyntheticEvent, id: number) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  // Обработчик удаления категории
  const handlerRemoveClick = (e: SyntheticEvent, id: number) => {
    e.stopPropagation()
    addNotification({
      onAccept: () => {
        removeCategory(id)
      },
      text: "Вы уверенны, что хотите удалить данную категорию?",
      unMount: (id: number) => {
        removeNotification(id)
      },
    })
  }

  const handlerRowClick = (categoryId: number) => {
    navigate(`/categories/${categoryId}`)
  }

  const rows = categories.map(el => {
    const { name, id, parentCategory } = el

    return [
      id,
      name,
      parentCategory?.name,
      896,
      <Button onClick={e => handlerRemoveClick(e, id as number)}>
        remove
      </Button>,
      <Button
        isDangerous={"dangerous"}
        onClick={e => handlerEditClick(e, id as number)}>
        edit
      </Button>,
    ]
  })

  return (
    <div className="p-4 w-full min-h-screen">
      {notifications.map(note => (
        <Note {...note} />
      ))}
      <Modal handlerClose={handlerClose} isOpen={isModalOpen}></Modal>
      <h1 className={style.content__title}>Categories</h1>
      {categories.length ? (
        <Table
          BodyTableRowClickHandler={handlerRowClick}
          HeaderTableRow={headerTableCol}
          BodyTableRows={rows}
        />
      ) : (
        <div>
          <div>Создайте категорию</div>
        </div>
      )}
    </div>
  )
}

import {
  $categories,
  addCategory,
  getCategories,
  removeCategoryById,
} from "./store"
import { addNotification } from "modules/Notifications/store"

import { CreateNewCategory } from "./components/CategoryModal"

import { Add } from "ui/Add"
import { Button } from "ui/Button"
import { Modal } from "ui/Modal"
import { Table } from "ui/Table"

import { headerTableCol } from "./index.data"
import style from "./index.module.sass"

import { useStore } from "effector-react"
import { memo, SyntheticEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreateCategoryCommand, EditCategoryCommand } from "entity"

export const Categories = memo(() => {
  useEffect(() => {
    getCategories()
  }, [])

  const categories = useStore($categories)
  const isLoading = useStore(getCategories.pending)

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
        removeCategoryById(id)
      },
      text: "Вы уверенны, что хотите удалить данную категорию?",
    })
  }

  const handlerRowClick = (categoryId: number) => {
    navigate(`/categories/${categoryId}`)
  }

  // Открытие модалки с созданием новой категории
  const handlerCreateNewCategory = () => {
    setIsModalOpen(true)
  }

  // обработчик создания новой категории in Modal
  const handlerSendNewCategory = async (payload: CreateCategoryCommand|EditCategoryCommand) => {
    await addCategory(payload)
    await getCategories()
  }

  const rows = categories.map(el => {
    const { name, id } = el

    return [
      id,
      name,
      el.products?.length,
      <Button onClick={e => handlerRemoveClick(e, id as number)}>
        remove
      </Button>,
      <Button
        isDangerous={true}
        onClick={e => handlerEditClick(e, id as number)}>
        edit
      </Button>,
    ]
  })

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div className="p-4 w-full">
      <Modal
        title="Создать новую категорию"
        handlerClose={handlerClose}
        isOpen={isModalOpen}>
        <CreateNewCategory
          handlerSave={handlerSendNewCategory}
          handlerClose={handlerClose}
        />
      </Modal>
      <div className="flex gap-5 items-center mb-4">
        <h1 className={style.content__title}>Categories</h1>
        <Add handlerAdd={handlerCreateNewCategory} />
      </div>
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
})

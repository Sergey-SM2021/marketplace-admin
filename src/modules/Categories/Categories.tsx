import { Category, CreateCategoryCommand, EditCategoryCommand } from "entity"

import {
  $categories,
  addCategory,
  getCategories,
  removeCategoryById,
} from "./store/store"
import { addNotification } from "modules/Notifications/store"

import { CategoryModal } from "./components/CategoryModal"

import { Add } from "ui/Add"
import { Header } from "ui/Table/Header"

import { useModal } from "./hooks/useModal"
import { headerTableCol } from "./index.data"
import style from "./index.module.sass"
import { RenderCategory } from "./utils/RenderCategory/RenderCategory"

import { useStore } from "effector-react"
import { memo, useEffect, FC } from "react"
import { useNavigate } from "react-router-dom"

export const Categories: FC = memo(() => {
  const categories = useStore($categories)
  const isLoading = useStore(getCategories.pending)
  const navigate = useNavigate()
  const modal = useModal()

  useEffect(() => {
    getCategories()
  }, [])

  // redirect на products по нажатию на любой ряд
  const handlerRowClick = (categoryId: number) => {
    navigate(`/categories/${categoryId}`)
  }

  // Обработчик удаления категории
  const handlerRemoveClick = (id: number) => {
    addNotification({
      onAccept: () => {
        removeCategoryById(id)
      },
      text: "Вы уверенны, что хотите удалить данную категорию?",
    })
  }

  // callback который создаёт новую категорию. передать как props in Modal
  const handlerSendNewCategory = async (
    payload: CreateCategoryCommand
  ) => {
    await addCategory(payload)
  }

  // onEdit
  const handlerEdit = ({ id, name, parentCategoryId, features }: Category) =>
    modal.hanlerOpen({
      id,
      name: name,
      parentCategoryId: parentCategoryId,
    })

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div className="p-4 w-full">
      {modal.isOpen ? (
        <CategoryModal
          categories={categories.map(cat => ({
            key: cat.name as string,
            value: cat.id as number,
          }))}
          category={modal.state}
          handlerSave={handlerSendNewCategory}
          handlerClose={modal.handlerClose}
        />
      ) : null}
      <div className="flex gap-5 items-center mb-4">
        <h1 className={style.content__title}>Categories</h1>
        <Add handlerAdd={modal.hanlerOpen} />
      </div>
      {categories.length ? (
        <table
          style={{
            margin: "-10px 0",
            borderSpacing: "0 10px",
            borderCollapse: "separate",
            minWidth: "100%",
          }}>
          <Header row={headerTableCol} />
          {categories.map(cat => (
            <RenderCategory
              onEdit={() =>
                handlerEdit({
                  id: cat.id!,
                  name: cat.name!,
                  parentCategoryId: cat.parentCategoryId!,
                })
              }
              onRemove={() => handlerRemoveClick(cat.id as number)}
              category={cat}
              onClick={(id: number) => handlerRowClick(id)}
            />
          ))}
        </table>
      ) : (
        <div>
          <div>Создайте категорию</div>
        </div>
      )}
    </div>
  )
})

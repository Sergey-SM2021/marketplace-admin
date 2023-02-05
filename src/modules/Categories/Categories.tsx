import { Category, CreateCategoryCommand, EditCategoryCommand } from "entity"

import {
  $categories,
  addCategory,
  displayChildrenByIndex,
  getCategories,
  HideChilds,
  ILocalCategory,
  removeCategoryById,
  ShowChilds,
} from "./store"
import { addNotification } from "modules/Notifications/store"

import { CategoryModal } from "./components/CategoryModal"

import { WatchChild } from "./ui/WatchChild"
import { Add } from "ui/Add"
import { Button } from "ui/Button"
import { Table } from "ui/Table"

import { headerTableCol } from "./index.data"
import style from "./index.module.sass"

import { useStore } from "effector-react"
import React, {
  memo,
  SyntheticEvent,
  useEffect,
  useState,
  MouseEvent,
  FC,
} from "react"
import { useNavigate } from "react-router-dom"

// export const Toggling: FC<{
//   Enabled: React.ReactNode
//   Disabled: React.ReactNode
// }> = ({ Enabled, Disabled }) => {
//   const [isEnabled, SetIsEnabled] = useState(false)

//   return isEnabled ? Enabled : Disabled
// }

export const Categories = memo(() => {
  useEffect(() => {
    getCategories()
  }, [])

  const categories = useStore($categories)
  const isLoading = useStore(getCategories.pending)

  const navigate = useNavigate()

  // redirect на продукты
  const handlerRowClick = (categoryId: number) => {
    navigate(`/categories/${categoryId}`)
  }

  const [modal, setModal] = useState<{
    isOpen: boolean
    state: EditCategoryCommand | null
  }>({ isOpen: false, state: {} })

  interface IHanleModalOpen {
    e?: MouseEvent<HTMLButtonElement>
    state?: EditCategoryCommand
  }

  const hanleModalOpen = ({ e, state }: IHanleModalOpen) => {
    if (e) {
      e.stopPropagation()
    }
    setModal({ isOpen: true, state: state || null })
  }

  const handleModalClose = () => {
    setModal({ isOpen: false, state: null })
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

  // callback создания новой категории props for Modal
  const handlerSendNewCategory = async (
    payload: CreateCategoryCommand | EditCategoryCommand
  ) => {
    await addCategory(payload)
    await getCategories()
  }

  const rows = categories.map((el, i) => {
    const { name, id, childCategories } = el

    const row = [
      el.childCategories?.length ? (
        <Button
          isDangerous={el.isOpen}
          onClick={e => {
            if (el.isOpen) {
              e.stopPropagation()
              HideChilds(el.childCategories as ILocalCategory[])
            } else {
              ShowChilds(el)
              e.stopPropagation()
              displayChildrenByIndex({
                index: i + 1,
                categories: childCategories!,
              })
            }
          }}>
          Смотреть
        </Button>
      ) : null,
      id,
      name,
      el.products?.length,
      <Button onClick={e => handlerRemoveClick(e, id as number)}>
        remove
      </Button>,
      <Button
        isDangerous={true}
        onClick={e =>
          hanleModalOpen({
            e,
            state: {
              categoryId: id,
              name: name,
              parentCategoryId: el.parentCategoryId,
            },
          })
        }>
        edit
      </Button>,
    ]

    return row
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
          handlerClose={handleModalClose}
        />
      ) : null}
      <div className="flex gap-5 items-center mb-4">
        <h1 className={style.content__title}>Categories</h1>
        <Add
          handlerAdd={() => {
            hanleModalOpen({})
          }}
        />
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

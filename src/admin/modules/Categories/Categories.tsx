import {
  Category,
  CreateCategoryCommand,
  CreateProductCommand,
  EditCategoryCommand,
} from "entity"

import {
  $categoriesTree,
  addCategory,
  createProduct,
  getCategories,
  getCategoriesTree,
  removeCategoryById,
  updateCategory,
} from "./store/store"
import { $categories } from "./store/store"
import { addNotification } from "admin/modules/Notifications/store"

import { CategoryModal } from "./components/CategoryModal"
import { CreateProductModal } from "./components/CreateProductModal/CreateProductModal"

import { Modal } from "admin/ui"
import { Add } from "admin/ui/Add"
import { Header } from "admin/ui/Table/Header"

import { useModal } from "./hooks/useModal"
import { headerTableCol } from "./index.data"
import style from "./index.module.sass"
import { RenderCategory } from "./utils/RenderCategory/RenderCategory"

import { useStore } from "effector-react"
import { memo, useEffect, FC } from "react"
import { useNavigate } from "react-router-dom"

export const Categories: FC = memo(() => {
  const categoriesTree = useStore($categoriesTree)
  const categories = useStore($categories)
  const isLoading = useStore(getCategoriesTree.pending)
  const navigate = useNavigate()
  const createCategoryModal = useModal<Category>(null)
  const createProductModal = useModal<number>(null)

  useEffect(() => {
    getCategoriesTree()
  }, [])

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
  const handlerSendNewCategory = async (payload: CreateCategoryCommand) => {
    await addCategory(payload)
  }

  const handlerUpdateCategory = async (Category: EditCategoryCommand) => {
    updateCategory(Category)
  }

  // onEdit
  const handlerEdit = ({ id, name, parentCategoryId, features }: Category) =>
    createCategoryModal.hanlerOpen({
      id,
      name: name,
      parentCategoryId: parentCategoryId,
    })

  // При нажатии на кнопку создать продукт
  const handlerCreateProduct = (id: number) => {
    createProductModal.hanlerOpen(id)
  }

  // Callback, который сработает при создании продукта в компоненте CreateProductModal
  const onCreateProduct = async (product: CreateProductCommand) => {
    await createProduct({ ...product, categoryId: createProductModal.state })
    createProductModal.handlerClose()
  }

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div className="p-4 w-full">
      {createCategoryModal.isOpen ? (
        <CategoryModal
          categories={categories.map(cat => ({
            key: cat.name as string,
            value: cat.id as number,
          }))}
          category={createCategoryModal.state}
          handlerSave={
            createCategoryModal.state
              ? handlerUpdateCategory
              : handlerSendNewCategory
          }
          handlerClose={createCategoryModal.handlerClose}
        />
      ) : null}
      {createProductModal.isOpen ? (
        <Modal
          handlerClose={createProductModal.handlerClose}
          title="Создать продукт">
          <CreateProductModal onCreateProduct={onCreateProduct} />
        </Modal>
      ) : null}
      <div className="flex gap-5 items-center mb-4">
        <h1 className={style.content__title}>Categories</h1>
        <Add handlerAdd={() => createCategoryModal.hanlerOpen()} />
      </div>
      {categoriesTree.length ? (
        <table
          style={{
            margin: "-10px 0",
            borderSpacing: "0 10px",
            borderCollapse: "separate",
            minWidth: "100%",
          }}>
          <Header row={headerTableCol} />
          {categoriesTree.map(cat => (
            <RenderCategory
              onEdit={() =>
                handlerEdit({
                  id: cat.id!,
                  name: cat.name!,
                  parentCategoryId: cat.parentCategoryId!,
                })
              }
              onRemove={handlerRemoveClick}
              category={cat}
              onClick={(id: number) => handlerRowClick(id)}
              onAddProduct={handlerCreateProduct}
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

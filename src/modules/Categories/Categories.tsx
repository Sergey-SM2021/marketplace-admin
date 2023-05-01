import { CategoryModal } from "./components/CreateCategoryModal/CategoryModal"
import { useModal } from "./hooks/useModal"
import { headerTableCol } from "./index.data"
import style from "./index.module.sass"
import {
  $categoriesTree,
  addCategory,
  createProduct,
  getCategories,
  getCategoriesTree,
  removeCategoryById,
  updateCategory,
 $categories, $params } from "./store/store"
import * as store from "./store/store"
import { RenderCategory } from "./utils/RenderCategory/RenderCategory"

import {
  type Category,
  type CreateCategoryCommand,
  type CreateProductCommand,
  type EditCategoryCommand,
} from "types"

import { useDisclosure } from "@chakra-ui/react"
import { addNotification } from "App/Providers/Notifications/store"
import { useStore } from "effector-react"
import { memo, useEffect, type FC } from "react"
import { useNavigate } from "react-router-dom"
import { Add } from "ui/Add"
import { Header } from "ui/Table/Header"

export const Categories: FC = memo(() => {
  const categoriesTree = useStore($categoriesTree)
  const params = useStore($params)
  const { onClose, isOpen, onOpen } = useDisclosure()
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
    { createCategoryModal.hanlerOpen({
      id,
      name,
      parentCategoryId,
    }); }

  // При нажатии на кнопку создать продукт
  const handlerCreateProduct = (id: number) => {
    createProductModal.hanlerOpen(id)
  }

  const getParamsByCategory = async (id: number) => {
    return await store.getParamsByCategory(id)
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
    <>
      <div className="p-4 w-full">
        <div className="flex gap-5 items-center mb-4">
          <h1 className={style.content__title}>Categories</h1>
          <Add handlerAdd={onOpen} />
        </div>
        {(categoriesTree.length > 0) ? (
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
                  { handlerEdit({
                    id: cat.id!,
                    name: cat.name!,
                    parentCategoryId: cat.parentCategoryId!,
                  }); }
                }
                onRemove={handlerRemoveClick}
                category={cat}
                onClick={(id: number) => { handlerRowClick(id); }}
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
      {isOpen ? (
        <CategoryModal
          addCategory={addCategory}
          getCurrentParams={getParamsByCategory}
          params={params}
          categories={categories}
          isOpen={true}
          onClose={onClose}
        />
      ) : null}
    </>
  )
})

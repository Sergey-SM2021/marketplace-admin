import { CategoryResponseDTO } from "./../../../../entity/models/CategoryResponseDTO"
import { Category, CreateCategoryCommand, CreateProductCommand } from "entity"

// import { setIsOpenMode } from "./store.spec"
import { api } from "../api"

import { createDomain } from "effector"
// @ts-ignore
import { attachLogger } from "effector-logger/attach"
import "effector-logger/inspector"

export interface ILocalCategory extends Category {
  isOpen: boolean
  childCategories: Array<ILocalCategory>
}

// #FIXME: Уберите меня в utils!!!!!!!!
export const setIsOpenMode = (
  category: ILocalCategory,
  id: number,
  mode: boolean
) => {
  if (category.id === id) {
    category.isOpen = mode
  }
  if (category.childCategories.length) {
    category.childCategories.forEach(cat => setIsOpenMode(cat, id, mode))
  }
}

export const appandCategoriesChild = (
  root: ILocalCategory,
  child: Category
) => {
  if (root.id === child.parentCategoryId) {
    root.childCategories.push({ ...child, isOpen: false, childCategories: [] })
    return 
  }
  if (root.childCategories.length) {
    root.childCategories.forEach(childCat =>
      appandCategoriesChild(childCat, child)
    )
  }
}

const categoriesDomain = createDomain()

export const getCategoriesTree = categoriesDomain.createEffect<
  void,
  Array<ILocalCategory>
>(api.getCategoriesTree)

export const removeCategoryById = categoriesDomain.createEffect<number, string>(
  api.removeCategory
)

export const addCategory = categoriesDomain.createEffect<
  CreateCategoryCommand,
  Category
>(api.createCategory)

export const createProduct = categoriesDomain.createEffect<
  CreateProductCommand,
  void
>(api.createProduct)

export const getCategories = categoriesDomain.createEffect<
  void,
  CategoryResponseDTO[]
>(api.getCategories)

// Change state у category.isOpen
export const ShowChilds = categoriesDomain.createEvent<number>()
export const HideChilds = categoriesDomain.createEvent<number>()

export const $categories = categoriesDomain
  .createStore<CategoryResponseDTO[]>([])
  .on(getCategories.doneData, (_, payload) => payload)

export const $categoriesTree = categoriesDomain
  .createStore<ILocalCategory[]>([])
  .on(getCategoriesTree.doneData, (_, payload) =>
    payload.map(category => ({ ...category, isOpen: false }))
  )
  .on(removeCategoryById.done, (state, { params }) =>
    state.filter(category => category.id !== params)
  )
  // FIXME: id, category, mode - в один объект и один тип вынеси блядь
  .on(ShowChilds, (state, payload) => {
    state.forEach(el => setIsOpenMode(el, payload, true))
    return [...state]
  })
  .on(HideChilds, (state, payload) => {
    state.forEach(el => setIsOpenMode(el, payload, false))
    return [...state]
  })
  .on(addCategory.doneData, (state, payload) => {
    state.forEach(el => {
      appandCategoriesChild(el, payload)
    })
    return [...state]
  })
  .on(createProduct.doneData, (state, payload) => {
    alert(JSON.stringify(payload))
  })

attachLogger(categoriesDomain, {
  reduxDevtools: "disabled",
})

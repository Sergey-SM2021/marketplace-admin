import { Category, CreateCategoryCommand, CreateProductCommand } from "entity"
import { CategoryResponseDTO } from "entity/models/CategoryResponseDTO"

// import { setIsOpenMode } from "./store.spec"
import * as api from "../api"

import { removeNestedCat } from "../utils"
import { addNestedCat } from "../utils/addNestedCat/addNestedCat"

import { createDomain } from "effector"
// @ts-ignore
import { attachLogger } from "effector-logger/attach"
import "effector-logger/inspector"

export const appandCategoriesChild = (root: Category, child: Category) => {
  if (root.childCategories && root.id === child.parentCategoryId) {
    root.childCategories.push({ ...child, childCategories: [] })
    return
  }
  if (root.childCategories && root.childCategories.length) {
    root.childCategories.forEach(childCat =>
      appandCategoriesChild(childCat, child)
    )
  }
}

const categoriesDomain = createDomain()

export const getCategoriesTree = categoriesDomain.createEffect<
  void,
  Array<Category>
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

export const updateCategory = categoriesDomain.createEffect<Category, Category>(
  api.editCategory
)

export const $categories = categoriesDomain
  .createStore<CategoryResponseDTO[]>([])
  .on(getCategories.doneData, (_, payload) => payload)
  .on(addCategory.doneData, (state, payload) => [...state, payload])
  .on(removeCategoryById.done, (state, { params }) =>
    [...state].filter(el => el.id !== params)
  )

export const $categoriesTree = categoriesDomain
  .createStore<Category[]>([])
  .on(getCategoriesTree.doneData, (_, payload) =>
    payload.map(category => ({ ...category, isOpen: false }))
  )
  .on(removeCategoryById.done, (state, { params }) => {
    if (state.findIndex(el => el.id === params) !== -1) {
      return state.filter(el => el.id !== params)
    }
    return state.map(s => removeNestedCat(s, params))
  })
  .on(addCategory.doneData, (state, payload) => {
    if (payload.parentCategoryId === null) {
      return [...state, { ...payload, childCategories: [] }]
    }
    return state.map(el => addNestedCat(el, payload))
  })
  .on(createProduct.doneData, (state, payload) => {
    alert(JSON.stringify(payload))
  })
  .on(updateCategory.done, (state, { params, result }) => {
    function rec(cat: Category) {
      if (cat.childCategories?.length) {
        cat.childCategories.forEach(element => {
          rec(element)
        })
      }
      return cat.id === result.id
        ? { ...result, isOpen: false, childCategories: result.childCategories }
        : cat
    }
    const res = state.map(el => rec(el))
    return res
  })

attachLogger(categoriesDomain, {
  reduxDevtools: "disabled",
})

import * as api from "../api"
import { removeNestedCat } from "../utils"
import { addNestedCat } from "../utils/addNestedCat/addNestedCat"

import {
  type CategoryResponse,
  type Category,
  type CreateCategoryCommand,
  CategoryResponseTreeDTO,
} from "Shared/types"
import { type CategoryResponseDTO } from "Shared/types/models/CategoryResponseDTO"
import { createDomain } from "effector"

const categoriesDomain = createDomain()

export const getCategoriesTree = categoriesDomain.createEffect(
  api.getCategoriesTree
)

export const removeCategoryById = categoriesDomain.createEffect<number, string>(
  api.removeCategory
)

export const addCategory = categoriesDomain.createEffect<
  CreateCategoryCommand,
  CategoryResponse
>(api.createCategory)

export const getCategories = categoriesDomain.createEffect<
  void,
  CategoryResponseDTO[]
>(api.getCategories)

export const updateCategory = categoriesDomain.createEffect<Category, Category>(
  api.editCategory
)

export const removeCategoryParam = categoriesDomain.createEffect<
  number,
  string
>(api.removeCategoryParam)

export const $categoriesTree = categoriesDomain
  .createStore<CategoryResponseTreeDTO[]>([])
  .on(getCategoriesTree.doneData, (state, payload) =>
    payload.map(category => ({ ...category, isOpen: false }))
  )
  .on(removeCategoryById.done, (state, { params }) => {
    if (state.findIndex(el => el.id === params) !== -1) {
      return state.filter(el => el.id !== params)
    }
    return state.map(s => removeNestedCat(s, params))
  })
  .on(addCategory.doneData, (state, payload) => {
    if (payload?.category?.parentCategoryId === null) {
      return [...state, { ...payload.category, childCategories: [] }]
    }
    const result = state.map(el =>
      addNestedCat(el, payload.category as Category)
    )
    return result
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

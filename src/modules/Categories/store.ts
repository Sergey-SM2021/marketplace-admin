import { Category, CreateCategoryCommand } from "entity"

import { api } from "./api"

import { createDomain } from "effector"
// @ts-ignore
import { attachLogger } from "effector-logger/attach"
import "effector-logger/inspector"

interface ILocalCategory extends Category {
  isOpen: boolean
}

const categoriesDomain = createDomain()

export const getCategories = categoriesDomain.createEffect<
  void,
  Array<Category>
>(api.getCategories)

export const removeCategoryById = categoriesDomain.createEffect<number, string>(
  api.removeCategory
)

export const addCategory = categoriesDomain.createEffect<
  CreateCategoryCommand,
  number
>(api.createCategory)

export const displayChildrenByIndex = categoriesDomain.createEvent<{
  index: number
  categories: Category[]
}>()
// Change state у category.isOpen
export const ShowChilds = categoriesDomain.createEvent<ILocalCategory>()
export const HideChilds = categoriesDomain.createEvent<ILocalCategory[]>()

export const $categories = categoriesDomain
  .createStore<ILocalCategory[]>([])
  .on(getCategories.doneData, (_, payload) =>
    payload.map(category => ({ ...category, isOpen: false }))
  )
  .on(removeCategoryById.done, (state, { params }) =>
    state.filter(category => category.id !== params)
  )
  .on(displayChildrenByIndex, (state, { categories, index }) => {
    const StateCopy = [...state]
    StateCopy.splice(
      index,
      0,
      ...categories.map(cat => ({ ...cat, isOpen: false }))
    )
    return StateCopy
  })
  .on(ShowChilds, (state, { id }) =>
    [...state].map(c => (c.id === id ? { ...c, isOpen: true } : c))
  )
  .on(HideChilds, (state, childs:ILocalCategory[]) => [...state])

attachLogger(categoriesDomain, {
  reduxDevtools: "disabled",
  // inspector: "disabled",
  console: "disabled",
})

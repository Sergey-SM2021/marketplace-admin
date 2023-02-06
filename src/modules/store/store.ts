import { Category, CreateCategoryCommand } from "entity"

// import { setIsOpenMode } from "./store.spec"
import { api } from "../Categories/api"

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

const categoriesDomain = createDomain()

export const getCategories = categoriesDomain.createEffect<
  void,
  Array<ILocalCategory>
>(api.getCategories)

export const removeCategoryById = categoriesDomain.createEffect<number, string>(
  api.removeCategory
)

export const addCategory = categoriesDomain.createEffect<
  CreateCategoryCommand,
  number
>(api.createCategory)

// Change state у category.isOpen
export const ShowChilds = categoriesDomain.createEvent<number>()
export const HideChilds = categoriesDomain.createEvent<ILocalCategory[]>()

export const $categories = categoriesDomain
  .createStore<ILocalCategory[]>([])
  .on(getCategories.doneData, (_, payload) =>
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
  .on(HideChilds, (state, childs: ILocalCategory[]) =>
    [...state].filter(c => !childs.map(({ id }) => id).includes(c.id))
  )

attachLogger(categoriesDomain, {
  reduxDevtools: "disabled",
  // inspector: "disabled",
  // console: "disabled",
})

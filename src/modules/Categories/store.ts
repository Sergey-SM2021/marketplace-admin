import { createDomain } from "effector"
import { Category } from "entity"
import { api } from "./api"
import { Category0, Category1, Category2, Category3 } from "./index.data"

const categoriesDomain = createDomain()

export const getCategories = categoriesDomain.createEffect<
  void,
  Array<Category>
>(api.getCategories)

export const removeCategoryById = categoriesDomain.createEffect<number, string>(
  api.removeCategory
)

export const addCategory = categoriesDomain.createEffect<Category, number>(
  api.createCategory
)

export const $categories = categoriesDomain
  .createStore<Category[]>([Category0, Category1, Category2, Category3])
  .on(addCategory.doneData, () => {})
  .on(getCategories.doneData, (state, payload) => payload)
  .on(removeCategoryById.done, (state, { params }) =>
    state.filter(category => category.id !== params)
  )

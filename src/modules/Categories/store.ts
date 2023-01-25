import axios from "axios"
import { createDomain } from "effector"
import { Category } from "entity"
import { Category0, Category1, Category2, Category3 } from "./index.data"

const categoriesDomain = createDomain()

export const getCategories = categoriesDomain.createEffect<
  string,
  Array<Category>
>(async url => {
  const response = await (await axios.get(url)).data
  return response
})

export const removeCategoryById = categoriesDomain.createEffect<{id:number,url:string}, number>(
  async ({url,id}) => {
    await axios.delete(url)
    return id
  }
)

export const addCategory = categoriesDomain.createEffect<
  { url: string; payload: Category },
  number
>(async ({ url, payload }) => axios.post(url, payload))

export const $categories = categoriesDomain
  .createStore<Category[]>([Category0, Category1, Category2, Category3])
  .on(addCategory.doneData, () => {})
  .on(getCategories.doneData, (state, payload) => payload)
  .on(removeCategoryById.doneData, (state, payload) => 
    state.filter(category => category.id !== payload)
  )

import axios from "axios"
import { createDomain } from "effector"
import { Category } from "entity"
import { INotification } from "ui/Note"
import { Category0, Category1, Category2, Category3 } from "./index.data"

const categoriesDomain = createDomain()

// #FIXME - это общий эффект получается
export const getCategories = categoriesDomain.createEffect<string,Array<Category>>(async (url) => {
  const response = await (await axios.get(url)).data
  return response
})

export const removeCategory = categoriesDomain.createEvent<number>()

export const addCategory = categoriesDomain.createEffect<{url:string,payload:Category},number>(async ({url,payload}) => axios.post(url,payload))

export const $categories = categoriesDomain
  .createStore<Category[]>([Category0, Category1, Category2, Category3])
  .on(removeCategory, (state, payload) =>
    state.filter(category => category.id !== payload)
  )
  .on(addCategory.doneData, () => {})
  .on(getCategories.doneData, (state,payload) => payload)

// #FIXME: Надо вынести сообщения в глобальный модуль!!!
const notificationsDomain = createDomain()

export const addNotification =
  notificationsDomain.createEvent<Omit<INotification, "id">>()

export const removeNotification = notificationsDomain.createEvent<number>()

export const $notifications = notificationsDomain
  .createStore<INotification[]>([])
  .on(addNotification, (state, payload: Omit<INotification, "id">) => [
    ...state,
    { ...payload, id: Math.random() },
  ])
  .on(removeNotification, (state, payload) =>
    state.filter(note => note.id !== payload)
  )

import { createDomain, createEvent } from "effector"
import { Category } from "entity"
import { INotification } from "ui/Note"
import { Category0, Category1, Category2, Category3 } from "./index.data"

const categoriesDomain = createDomain()

export const removeCategory = createEvent<number>()

export const $categories = categoriesDomain
  .createStore<Category[]>([Category0, Category1, Category2, Category3])
  .on(removeCategory, (state, payload) =>
    state.filter(category => category.id !== payload)
  )

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

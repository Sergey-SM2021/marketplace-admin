import { createDomain } from "effector"
import { INotification } from "./ui/Note"

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

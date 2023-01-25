import { createDomain } from "effector"
import { INotification } from "./ui/Note"

type TNotification = Omit<INotification, "unMount">

const notificationsDomain = createDomain()

export const addNotification =
  notificationsDomain.createEvent<Omit<TNotification, "id">>()

export const removeNotification = notificationsDomain.createEvent<number>()

export const $notifications = notificationsDomain
  .createStore<Array<TNotification>>([])
  .on(addNotification, (state, payload: Omit<TNotification, "id">) => [
    ...state,
    { ...payload, id: Math.random() },
  ])
  .on(removeNotification, (state, payload) =>
    state.filter(note => note.id !== payload)
  )

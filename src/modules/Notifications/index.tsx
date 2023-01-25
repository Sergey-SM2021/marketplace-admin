import { createDomain } from "effector"
import { useStore } from "effector-react"
import { INotification, Note } from "./Note"

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

export const Notifications = () => {
  const notifications = useStore($notifications)
  return (
    <div>
      {notifications.map(note => (
        <Note {...note} />
      ))}
    </div>
  )
}

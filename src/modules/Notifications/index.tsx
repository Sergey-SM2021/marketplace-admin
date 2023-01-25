import { useStore } from "effector-react"
import { $notifications, removeNotification } from "./store"
import { Note } from "./ui/Note"

export const Notifications = () => {
  const notifications = useStore($notifications)
  const unMountHandler = (id: number) => {
    removeNotification(id)
  }
  return (
    <div>
      {notifications.map(note => (
        <Note {...note} unMount={unMountHandler} />
      ))}
    </div>
  )
}

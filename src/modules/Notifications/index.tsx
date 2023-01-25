import { useStore } from "effector-react"
import { $notifications } from "./store"
import { Note } from "./ui/Note"

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

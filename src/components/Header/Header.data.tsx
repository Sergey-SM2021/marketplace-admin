import { ReactComponent as Items } from "assets/items.svg"
import { ReactComponent as Notes } from "assets/notes.svg"
import { ReactComponent as Settings } from "assets/settings.svg"
import { v4 } from "uuid"

export const navLinks = [
  { icon: <Items />, text: "Categories", id: v4() },
  { icon: <Settings />, text: "Settings", id: v4() },
  { icon: <Notes />, text: "Notifications", id: v4() },
]

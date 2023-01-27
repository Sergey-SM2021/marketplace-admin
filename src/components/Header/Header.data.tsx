import { ReactComponent as Items } from "assets/items.svg"
import { ReactComponent as Notes } from "assets/notes.svg"
import { ReactComponent as Settings } from "assets/settings.svg"
import { v4 } from "uuid"

export const navLinks = [
  { icon: <Items className="w-5 h-5 fill-white"/>, text: "Categories", id: v4() },
  { icon: <Settings className="w-5 h-5 fill-white"/>, text: "Settings", id: v4() },
  { icon: <Notes className="w-5 h-5 fill-white"/>, text: "Notifications", id: v4() },
]

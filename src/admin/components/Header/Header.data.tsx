import { v4 } from "uuid"

import { ReactComponent as Items } from "admin/assets/items.svg"
import { ReactComponent as Notes } from "admin/assets/notes.svg"
import { ReactComponent as Products } from "admin/assets/products.svg"
import { ReactComponent as Settings } from "admin/assets/settings.svg"

export const navLinks = [
  {
    icon: <Items className="w-5 h-5 fill-white" />,
    text: "Categories",
    id: v4(),
    link: "/admin/categories",
  },
  {
    icon: <Settings className="w-5 h-5 fill-white" />,
    text: "Settings",
    id: v4(),
    link: "/admin/settings",
  },
  {
    icon: <Notes className="w-5 h-5 fill-white" />,
    text: "Notifications",
    id: v4(),
    link: "/admin/notifications-list",
  },
  {
    icon: <Products className="w-5 h-5 fill-white" />,
    text: "Products",
    id: v4(),
    link: "/admin/products",
  },
]

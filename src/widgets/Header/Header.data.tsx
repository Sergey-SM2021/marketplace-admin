import { v4 } from "uuid"

import { ReactComponent as Items } from "assets/items.svg"
import { ReactComponent as Products } from "assets/products.svg"

export const navLinks = [
  {
    icon: <Items className="w-5 h-5 fill-white" />,
    text: "Categories",
    id: v4(),
    link: "/admin/categories",
  },
  {
    icon: <Products className="w-5 h-5 fill-white" />,
    text: "Products",
    id: v4(),
    link: "/admin/products",
  },
]

import { ReactComponent as Items } from "Shared/assets/items.svg"
import { ReactComponent as Products } from "Shared/assets/products.svg"
import { v4 } from "uuid"

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

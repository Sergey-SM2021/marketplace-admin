import { ItemsPage } from "../pages/Items/index"
import { ProductsPage } from "../pages/Products/index"
import { AuthPage } from "pages/Auth"
import { CategoriesPage } from "pages/Categories"

import { Navigate } from "react-router-dom"

export const $privateRoutes = [
  {
    path: "/",
    element: <CategoriesPage />,
  },
  {
    path: "/categories/:categoryId",
    element: <ItemsPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/profile",
    element: <div>profile</div>,
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]

export const $publicRoutes = [
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]

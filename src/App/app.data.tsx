import { ItemsPage } from "../pages/Items/index"
import { ProductsPage } from "../pages/Products/index"
import { CategoriesPage } from "pages/Categories"
import { SignInPage } from "pages/SignIn"
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
]

export const $publicRoutes =[
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]
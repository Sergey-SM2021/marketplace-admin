import { CategoriesPage } from "pages/Categories"
import { ItemsPage } from "pages/Items/index"
import { ProductPage } from "pages/ProductPage"
import { ProductsPage } from "pages/Products/index"

import { Layout } from "Layout/index"
import { Navigate } from "react-router-dom"

export const $privateRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <CategoriesPage />,
      },
      {
        path: "/admin/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/admin/categories/:categoryId",
        element: <ItemsPage />,
      },
      {
        path: "/admin/products",
        element: <ProductsPage />,
      },
      {
        path: "/admin/products/:id",
        element: <ProductsPage />,
      },
      {
        path: "/admin/profile",
        element: <div>profile</div>,
      },
      {
        path: "/admin/*",
        element: <Navigate to={"/"} />,
      },
      {
        path: "/admin/notifications-list",
        element: <div>/admin/notifications-list</div>,
      },
      {
        path: "/admin/settings",
        element: <div>/admin/settings</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>error</div>,
  },
]

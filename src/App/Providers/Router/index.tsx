import { CategoriesPage } from "pages/Categories"
import { ProductPage } from "pages/ProductPage"
import { ProductsPage } from "pages/Products"

import { Layout } from "App/Providers/Layout"
import { Navigate } from "react-router-dom"
import { Settings } from "pages/Settings"

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
        path: "/product/:id",
        element: <ProductPage />,
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
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <div>error</div>,
  },
]

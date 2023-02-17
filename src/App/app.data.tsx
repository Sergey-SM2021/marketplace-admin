import { AuthPage } from "client/pages/AuthPage"
import { CategoriesPage } from "admin/pages/Categories"
import { ItemsPage } from "admin/pages/Items/index"
import { ProductsPage } from "admin/pages/Products/index"

import { Layout } from "admin/Layout/index"
import { ClientPages } from "client"
import { Navigate } from "react-router-dom"

export const $privateRoutes = [
  {
    path: "/admin/",
    element: <Layout />,
    children: [
      {
        path: "/admin/categories/",
        element: <CategoriesPage />,
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
        element: <div>/admin/notifications-list</div>
      },
      {
        path: "/admin/settings",
        element: <div>/admin/settings</div>
      },
    ],
  },
  {
    path: "/",
    element: <ClientPages.MainPage />,
  },
  {
    path: "*",
    element: <div>error</div>,
  },
]

export const $publicRoutes = [
  {
    path: "/",
    element: <ClientPages.MainPage />,
  },
  {
    path: "/signIn",
    element: <AuthPage />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]

import { $auth } from "modules/Auth/store/store"

import { Sidebar } from "../modules/Sidebar"

import { Header } from "components/Header"

import { $privateRoutes, $publicRoutes } from "./app.data"

import { useStore } from "effector-react"
import { useLocation, useRoutes } from "react-router-dom"

export const App = () => {
  const publicRoutes = useRoutes($publicRoutes)
  const privateRoutes = useRoutes($privateRoutes)
  const isAuth = useStore($auth)
  const { pathname } = useLocation()
  return (
    <div className="flex bg-gray min-h-screen h-full">
      {pathname === "/products" || pathname.split("/")[1] === "categories" ? (
        <Sidebar />
      ) : null}
      <div className="flex-auto">
        <Header />
        {isAuth ? privateRoutes : publicRoutes}
      </div>
    </div>
  )
}

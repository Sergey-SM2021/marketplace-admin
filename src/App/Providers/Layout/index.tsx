import { Sidebar } from "modules/Sidebar"

import { Header } from "widgets/Header"

import { type FC, type PropsWithChildren } from "react"
import { Outlet, useLocation } from "react-router-dom"

interface ILayout extends PropsWithChildren {}

export const Layout: FC<ILayout> = () => {
  const { pathname } = useLocation()
  return (
    <div className="flex bg-gray min-h-screen h-full">
      {pathname.includes("/products") ? (
        <Sidebar />
      ) : null}
      <div className="flex-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

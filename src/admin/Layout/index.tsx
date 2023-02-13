import { Sidebar } from "admin/modules/Sidebar"

import { Header } from "admin/components/Header"

import { FC, PropsWithChildren } from "react"
import { Outlet, useLocation } from "react-router-dom"

interface ILayout extends PropsWithChildren {}

export const Layout: FC<ILayout> = () => {
  const { pathname } = useLocation()
  return (
    <div className="flex bg-gray min-h-screen h-full">
      {pathname === "/products" || pathname.split("/")[1] === "categories" ? (
        <Sidebar />
      ) : null}
      <div className="flex-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

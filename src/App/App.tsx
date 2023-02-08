import { Sidebar } from "../modules/Sidebar"

import { Header } from "components/Header"

import { Outlet, useLocation } from "react-router-dom"


export const App = () => {
  const {pathname} = useLocation()
  return (
    <div className="flex bg-gray min-h-screen h-full">
      {(pathname === '/products' || pathname.split('/')[1] === 'categories') ? <Sidebar /> : null}
      <div className="flex-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

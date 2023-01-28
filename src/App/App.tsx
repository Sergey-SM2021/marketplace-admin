import { Sidebar } from "../modules/Sidebar"
import { Outlet } from "react-router-dom"
import { Header } from "components/Header"

export const App = () => (
  <div className="flex bg-gray min-h-screen h-full">
    <Sidebar />
    <div className="flex-auto">
      <Header />
      <Outlet />
    </div>
  </div>
)

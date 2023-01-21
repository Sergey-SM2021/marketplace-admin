import { Sidebar } from "../components/Sidebar"
// import style from "./App.module.sass"
import { Outlet } from "react-router-dom"

export const App = () => (
  <div className='flex h-screen'>
    <Sidebar />
    <div className="flex bg-gray flex-auto h-full">
      <Outlet />
    </div>
  </div>
)

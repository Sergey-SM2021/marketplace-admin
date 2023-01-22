import { Sidebar } from "./components/Sidebar"
import { Outlet } from "react-router-dom"

export const App = () => (
  <div className='flex min-h-screen h-screen'>
    <Sidebar />
    <div className="flex bg-gray flex-auto h-full">
      <Outlet />
    </div>
  </div>
)
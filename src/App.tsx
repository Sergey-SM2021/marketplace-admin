import { Sidebar } from "./components/Sidebar"
import { Outlet } from "react-router-dom"
import { Note } from "ui/Note"

export const App = () => (
  <div className='flex min-h-screen h-full'>
    <Sidebar />
    <div className="flex bg-gray flex-auto h-full">
      <Outlet />
    </div>
  </div>
)
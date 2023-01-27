import { Sidebar } from "../components/Sidebar"
import { Outlet } from "react-router-dom"
import { Header } from "components/Header"
import style from "./style.module.scss"

export const App = () => (
  <div className={style.app}>
    <Header />
    <Sidebar />
    <Outlet />
  </div>
)

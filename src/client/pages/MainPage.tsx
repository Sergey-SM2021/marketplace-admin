import { Button } from "admin/ui"

import { FC, PropsWithChildren } from "react"
import { Link } from "react-router-dom"

interface IMainPage extends PropsWithChildren {}

export const MainPage: FC<IMainPage> = ({ children }) => {
  return (
    <div className="flex gap-5 p-10">
      Это клиентка
      <Link to={"/signin"}>
        <Button>sign in</Button>
      </Link>
      <Link to={"/admin/categories"}>
        <Button>admin</Button>
      </Link>
      <Link to={"/"}>
        <Button isDangerous>reset</Button>
      </Link>
      {children}
    </div>
  )
}

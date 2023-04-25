import { $privateRoutes, $publicRoutes } from "./app.data"

import { $isAuth } from "client"
import { useStore } from "effector-react"
import { useRoutes } from "react-router-dom"

export const App = () => {
  const publicRoutes = useRoutes($publicRoutes)
  const privateRoutes = useRoutes($privateRoutes)
  let isAuth = useStore($isAuth)
  return isAuth ? privateRoutes : publicRoutes
}


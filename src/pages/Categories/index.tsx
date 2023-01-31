import { Categories } from "modules/Categories/Categories"
import { Notifications } from "modules/Notifications"
import { FC } from "react"

export const CategoriesPage: FC = () => {
  return (
    <>
      <Notifications />
      <Categories />
    </>
  )
}

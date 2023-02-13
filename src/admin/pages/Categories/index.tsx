import { Categories } from "admin/modules/Categories/Categories"
import { Notifications } from "admin/modules/Notifications"
import { FC } from "react"

export const CategoriesPage: FC = () => {
  return (
    <>
      <Notifications />
      <Categories />
    </>
  )
}

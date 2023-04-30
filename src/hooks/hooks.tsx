import { $categories, getCategories } from "Entity/Categories/store/store"

import { useStore } from "effector-react"
import { useEffect } from "react"

export const useCategories = () => {
  useEffect(() => {
    getCategories()
  }, [])

  return useStore($categories)
}

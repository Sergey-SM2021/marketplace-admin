import { $categoriesTree, getCategoriesTree } from "../store/CategoriesTree"

import { useStore } from "effector-react"
import { useEffect } from "react"

export const useCategoriesTree = () => {
	const categories = useStore($categoriesTree)
  
	useEffect(() => {
		getCategoriesTree()
	}, [])

	return categories
}

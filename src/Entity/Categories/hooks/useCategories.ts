import { $categories, getCategories } from "../store/Categories"

import { useStore } from "effector-react"
import { useEffect } from "react"

export const useCategories = () => {
	const categories = useStore($categories)

	useEffect(() => {
		getCategories()
	}, [])

	return categories
}

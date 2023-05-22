import {
	addCategory,
	removeCategoryById,
	SetParamToCategory,
	updateCategory,
} from "Entity/CategoriesTree/store/CategoriesTree"

import { useStore } from "effector-react"

export const useCategoriesPageLoading = () => {
	const removeCategoryByIdPending = useStore(removeCategoryById.pending)
	const addCategoryPending = useStore(addCategory.pending)
	const updateCategoryPending = useStore(updateCategory.pending)
	const SetParamToCategoryPending = useStore(SetParamToCategory.pending)
	return (
		removeCategoryByIdPending ||
    addCategoryPending ||
    updateCategoryPending ||
    SetParamToCategoryPending
	)
}

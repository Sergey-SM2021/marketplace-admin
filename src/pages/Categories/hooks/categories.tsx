import { useStore } from "effector-react"
import {
	addCategory,
	getCategoriesTree,
	removeCategoryById,
	SetParamToCategory,
	updateCategory,
} from "Entity/CategoriesTree/store/CategoriesTree"

export const useCategoriesPageLoading = () => {
	const getCategoriesTreePending = useStore(getCategoriesTree.pending)
	const removeCategoryByIdPending = useStore(removeCategoryById.pending)
	const addCategoryPending = useStore(addCategory.pending)
	const updateCategoryPending = useStore(updateCategory.pending)
	const SetParamToCategoryPending = useStore(SetParamToCategory.pending)
	return (
		getCategoriesTreePending ||
    removeCategoryByIdPending ||
    addCategoryPending ||
    updateCategoryPending ||
    SetParamToCategoryPending
	)
}

import { Category } from "Shared/types"

export const updateCategoryHandler = (
	currentCategory: Category,
	updatedCategory: Category
): Category => {
	if (currentCategory.id === updatedCategory.id) {
		return updatedCategory
	}
	if (currentCategory.childCategories?.length) {
		return {
			...currentCategory,
			childCategories: currentCategory.childCategories.map(el =>
				updateCategoryHandler(el, updatedCategory)
			),
		}
	}
	return currentCategory
}

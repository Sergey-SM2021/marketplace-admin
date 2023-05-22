import { Category } from "Shared/types"

export const updateCategoryHandler = (
	currentCategory: Category,
	updatedCategory: Category
): Category | undefined => {
	// category та, но не на своём месте
	if (
		currentCategory.id === updatedCategory.id &&
    currentCategory.parentCategoryId !== updatedCategory.parentCategoryId
	) {
		return undefined
	}
	// мы в родительской категории
	if (currentCategory.id === updatedCategory.parentCategoryId) {
		if (currentCategory.childCategories?.length) {
			return {
				...currentCategory,
				childCategories: [...currentCategory.childCategories, updatedCategory],
			}
		}
		return {
			...currentCategory,
			childCategories: [updatedCategory],
		}
	}
	// category та и на своём месте
	if (
		currentCategory.id === updatedCategory.id &&
    currentCategory.parentCategoryId === updatedCategory.parentCategoryId
	) {
		return updatedCategory
	}
	// рекурсивный обход дитей
	if (currentCategory.childCategories?.length) {
		return {
			...currentCategory,
			childCategories: currentCategory.childCategories
				.map(el => updateCategoryHandler(el, updatedCategory))
				.filter(Boolean),
		}
	}
	return currentCategory
}

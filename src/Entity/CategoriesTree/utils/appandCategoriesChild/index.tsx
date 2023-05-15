import { type Category } from "Shared/types"

export const appandCategoriesChild = (root: Category, child: Category) => {
	if (root.childCategories != null && root.id === child.parentCategoryId) {
		root.childCategories.push({ ...child, childCategories: [] })
		return
	}
	if (root.childCategories != null && root.childCategories.length > 0) {
		root.childCategories.forEach(childCat => {
			appandCategoriesChild(childCat, child)
		})
	}
}

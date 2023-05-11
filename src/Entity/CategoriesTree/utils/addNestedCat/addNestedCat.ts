// возвращает категорию у которой в category.childsCategories добавленна категория
// рекурсивно, по id
import { type Category } from "Shared/types"

// addCategoryInChildCategoriesById
export const addNestedCat = (where: Category, what: Category): Category => {
  if ((where.childCategories != null) && (where.childCategories.length > 0)) {
    if (where.id === what.parentCategoryId) {
      return { ...where, childCategories: [...where.childCategories, what] }
    }
  }
  if (where.id === what.parentCategoryId) {
    return { ...where, childCategories: [what] }
  }
  if ((where.childCategories != null) && where.childCategories?.length) {
    return {
      ...where,
      childCategories: where.childCategories.map(c => addNestedCat(c, what)),
    }
  }
  return where
}

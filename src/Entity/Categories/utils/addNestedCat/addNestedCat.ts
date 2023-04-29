// возвращает категорию у которой в category.childsCategories добавленна категория
// рекурсивно, по id
import { Category } from "types"

// addCategoryInChildCategoriesById
export const addNestedCat = (where: Category, what: Category): Category => {
  if (where.childCategories && where.childCategories.length) {
    if (where.id === what.parentCategoryId) {
      return { ...where, childCategories: [...where.childCategories, what] }
    }
  }
  if (where.id === what.parentCategoryId) {
    return { ...where, childCategories: [what] }
  }
  if (where.childCategories && where.childCategories?.length) {
    return {
      ...where,
      childCategories: where.childCategories.map(c => addNestedCat(c, what)),
    }
  }
  return where
}

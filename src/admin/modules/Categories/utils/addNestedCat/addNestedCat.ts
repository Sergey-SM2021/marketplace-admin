// возвращает категорию у которой в category.childsCategories добавленна категория
// рекурсивно, по id
import { Category } from "entity"

// addCategoryInChildCategoriesById
export const addNestedCat = (where: Category, what: Category): Category => {
  if (where.id === what.parentCategoryId) {
    // FIXME: ещё скопировать прежнее значение
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

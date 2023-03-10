import { Category } from "entity"

export const removeNestedCat = (where: Category, id: number): Category => {
  if (where.childCategories && where.childCategories.length) {
    const isChildExist = where.childCategories.findIndex(el => el.id === id)
    if (isChildExist !== -1) {
      return {
        ...where,
        childCategories: where.childCategories.filter(c => c.id !== id),
      }
    }
    return {
      ...where,
      childCategories: where.childCategories.map(el => removeNestedCat(el, id)),
    }
  }
  return where
}

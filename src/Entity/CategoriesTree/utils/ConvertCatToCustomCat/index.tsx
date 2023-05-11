import { type Category } from "Shared/types"

export const ConvertCatToCustomCat = (cat: Category): Category => {
  return {
    ...cat,
    childCategories:
      cat.childCategories != null
        ? cat.childCategories.map(chCat => ConvertCatToCustomCat(chCat))
        : [],
  }
}

import { Category } from "entity"
import { addNestedCat } from "./addNestedCat"

describe("addCategoryInChildCategoriesById", () => {
  it(`addCategoryInChildCategoriesById вернёт изменённую категорию. Мы добавим категорию в child.childCategories`, () => {
    const cat1: Category = {
      name: "Мебель",
      parentCategoryId: null,
      features: [],
      id: 252,
    }

    const cat2: Category = {
      name: "Электроника",
      parentCategoryId: 252,
      id: 253,
    }

    const result: Category = { ...cat1, childCategories: [cat2] }
    const newCat = addNestedCat(cat1, cat2)
    expect(newCat.childCategories?.length).toBe(1)
    expect(newCat).toEqual(result)
  })
  it(`addCategoryInChildCategoriesById вернёт изменённую категорию.
  Мы добавим категорию в дочернюю категорию дочерней категории.`, () => {
    const cat1: Category = {
      name: "Мебель",
      parentCategoryId: null,
      features: [],
      id: 252,
      childCategories: [
        {
          name: "Электроника",
          parentCategoryId: 252,
          id: 253,
        },
      ],
    }

    const cat3: Category = {
      name: "Спички",
      parentCategoryId: 253,
      id: 254,
    }

    const result: Category = {
      name: "Мебель",
      parentCategoryId: null,
      features: [],
      id: 252,
      childCategories: [
        {
          name: "Электроника",
          parentCategoryId: 252,
          id: 253,
          childCategories: [
            {
              name: "Спички",
              parentCategoryId: 253,
              id: 254,
            },
          ],
        },
      ],
    }

    const newCat = addNestedCat(cat1, cat3)
    console.log(JSON.stringify(newCat))
    expect(newCat).toEqual(result)
  })
})

import { Category } from "types"

import { removeNestedCat } from "./removeNestedCat"

describe("removeNestedCat", () => {
  it("возвращает категорию, удалив из childCategories категорию по id", () => {
    const test: Category = {
      name: "Мебель",
      parentCategoryId: null,
      features: [],
      id: 252,
      childCategories: [
        {
          name: "Электроника",
          parentCategoryId: 252,
          features: [
            {
              name: "Бренд",
            },
          ],
          id: 253,
        },
      ],
    }

    const result = removeNestedCat(test, 253)
    expect(result.childCategories?.length).toBe(0)
  })

  it("возвращает категорию, удалив из childCategories у дочерней, категорию по id", () => {
    const test: Category = {
      name: "Электроника",
      parentCategoryId: null,
      childCategories: [
        {
          parentCategory: {
            features: [],
            name: "Электроника",
            parentCategoryId: null,
            id: 284,
          },
          childCategories: [],
          features: [],
          name: "Телевизоры",
          parentCategoryId: 284,
          id: 285,
        },
        {
          parentCategory: {
            features: [],
            name: "Электроника",
            parentCategoryId: null,
            id: 284,
          },
          childCategories: [
            {
              childCategories: [],
              features: [],
              name: "Ноутбуки",
              parentCategoryId: 286,
              id: 287,
            },
            {
              childCategories: [],
              features: [],
              name: "Моноблоки",
              parentCategoryId: 286,
              id: 288,
            },
          ],
          features: [],
          name: "Компьютеры",
          parentCategoryId: 284,
          id: 286,
        },
      ],
      features: [],
      id: 284,
    }

    const Expect: Category = {
      name: "Электроника",
      parentCategoryId: null,
      childCategories: [
        {
          parentCategory: {
            features: [],
            name: "Электроника",
            parentCategoryId: null,
            id: 284,
          },
          childCategories: [],
          features: [],
          name: "Телевизоры",
          parentCategoryId: 284,
          id: 285,
        },
        {
          parentCategory: {
            features: [],
            name: "Электроника",
            parentCategoryId: null,
            id: 284,
          },
          childCategories: [
            {
              childCategories: [],
              features: [],
              name: "Ноутбуки",
              parentCategoryId: 286,
              id: 287,
            },
          ],
          features: [],
          name: "Компьютеры",
          parentCategoryId: 284,
          id: 286,
        },
      ],
      features: [],
      id: 284,
    }

    const result = removeNestedCat(test, 288)
    expect(result.childCategories![1].childCategories?.length).toBe(1)
    expect(result).toEqual(Expect)
  })
})

import { generateId } from "utils/generateId"

export const headerTableCol = ["id", "name", "parentLink", "count", "action"]

export const Category0 = {
  id: generateId(),
  name: "Смартфоны",
  parentCategoryId: 90,
  parentCategory: {
    name: "Электроника",
  },
}

export const Category1 = {
  id: generateId(),
  name: "Бластеры",
  parentCategoryId: 90,
  parentCategory: {
    name: "Электроника",
  },
}

export const Category2 = {
  id: generateId(),
  name: "Игрушки",
  parentCategoryId: 90,
  parentCategory: {
    name: "Электроника",
  },
}

export const Category3 = {
  id: generateId(),
  name: "Компьютеры",
  parentCategoryId: 90,
  parentCategory: {
    name: "Электроника",
  },
}

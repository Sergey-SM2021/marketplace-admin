import {
  type CancelablePromise,
  type Category,
  type CategoryResponseDTO,
  type CreateCategoryCommand
} from "types"
import { type CreateProductCommand } from "types/models/CreateProductCommand"

import axios from "axios"

const ConvertCatToCustomCat = (cat: Category): Category => {
  return {
    ...cat,
    childCategories: (cat.childCategories != null)
      ? cat.childCategories.map(chCat => ConvertCatToCustomCat(chCat))
      : []
  }
}

interface IUpdateCategory {
  categoryId: number
  name: string
  parentCategoryId: number
}

const instance = axios.create({
  baseURL: "http://jenya123-001-site1.dtempurl.com/"
})

export const getCategoriesTree = async () => {
  const data = (
    await instance.get<CancelablePromise<CategoryResponseDTO[]>>(
      "Shop/GetCategoriesTree"
    )
  ).data
  return (await data).map(cat => ConvertCatToCustomCat(cat))
}

export const createCategory = async (payload: CreateCategoryCommand) => {
  return await (
    await instance.post<CancelablePromise<Category>>(
      "AdminPanel/CreateCategory",
      payload
    )
  ).data
}

export const removeCategory = async (id: number) => {
  return await (
    await instance.delete<CancelablePromise<string>>(
      `AdminPanel/DeleteCategory/${id}`
    )
  ).data
}
export const updateCategory = async (category: IUpdateCategory) => {
  return (await instance.put(`AdminPanel/EditCategory`, category)).data
}
export const createProduct = async (payload: CreateProductCommand) => {
  return (await instance.post("AdminPanel/CreateProduct", payload)).data
}
export const getCategories = async () => {
  return (await instance.get("Shop/GetCategories")).data
}
export const editCategory = async (category: Category) => {
  return (await instance.put<Category>("AdminPanel/EditCategory", category))
    .data
}
export const getParamsByCategory = async (id: number) => {
  return (await instance.get(`Shop/GetFeaturesByCategory/${id}`)).data
}

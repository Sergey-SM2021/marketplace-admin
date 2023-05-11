import {
  type CategoryResponse,
  type CancelablePromise,
  type Category,
  type CategoryResponseDTO,
  type CreateCategoryCommand,
  type EditCategoryCommand,
} from "Shared/types"
import { type CreateProductCommand } from "Shared/types/models/CreateProductCommand"

import { ConvertCatToCustomCat } from "../utils/ConvertCatToCustomCat"

import axios from "axios"

const instance = axios.create({
  baseURL: "http://jenya123-001-site1.dtempurl.com/",
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
    await instance.post<CancelablePromise<CategoryResponse>>(
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
export const updateCategory = async (category: EditCategoryCommand) => {
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

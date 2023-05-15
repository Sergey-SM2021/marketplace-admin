import { ConvertCatToCustomCat } from "../utils/ConvertCatToCustomCat"

import {
	type CategoryResponse,
	type CancelablePromise,
	type Category,
	type CreateCategoryCommand,
	type EditCategoryCommand,
	type CategoryResponseTreeDTO,
} from "Shared/types"
import { type CreateProductCommand } from "Shared/types/models/CreateProductCommand"
import axios from "axios"

const instance = axios.create({
	baseURL: "http://shopyshopy-001-site1.atempurl.com/",
})

export const getCategoriesTree = async () => {
	return (
		await instance.get<CategoryResponseTreeDTO[]>("Shop/GetCategoriesTree")
	).data.map(cat => ConvertCatToCustomCat(cat))
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
	return (await instance.put("AdminPanel/EditCategory", category)).data
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

export const removeCategoryParam = async (id: number) => {
	return await (
		await instance.delete<CancelablePromise<string>>(
			`AdminPanel/DeleteFeature/${id}`
		)
	).data
}

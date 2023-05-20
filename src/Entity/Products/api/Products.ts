import {
	EditProductCommand,
	type CreateProductCommand,
	type GetProductsResponse,
	ProductResponse,
} from "Shared/types"
import axios from "axios"

const instance = axios.create({
	baseURL: "http://shopyshopy-001-site1.atempurl.com/",
})

export const createProduct = async (product: CreateProductCommand) => {
	return (await instance.post("AdminPanel/CreateProduct", product)).data
}

export const updateProduct = async (product: EditProductCommand) =>
	(await instance.put<ProductResponse>("AdminPanel/EditProduct", product)).data
		.product

export const removeProduct = async (id: number) => {
	return (await instance.delete(`AdminPanel/DeleteProduct/${id}`)).data
}

export const getProducts = async (pageIndex = 1) => {
	return (
		await instance.post<GetProductsResponse>(
			`Shop/GetProducts?pageSize=5&pageIndex=${pageIndex}`,
			{
				price: {
					from: 0,
					to: 10000000,
				},
				rating: {
					from: 0,
					to: 0,
				},
				count: {
					from: 0,
					to: 0,
				},
				categoryIds: [],
			}
		)
	).data
}

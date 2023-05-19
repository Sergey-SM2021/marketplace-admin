import * as api from "../api/api"

import {
	Product,
	type GetProductsResponse,
	type ProductResponseDTO,
} from "Shared/types"
import { createDomain } from "effector"

const productDomain = createDomain()

export const createProduct = productDomain.createEffect(api.createProduct)
export const removeProduct = productDomain.createEffect(api.removeProduct)
export const updateProduct = productDomain.createEffect(api.updateProduct)
export const getProducts = productDomain.createEffect<
  void,
  GetProductsResponse
>(api.getProducts)

export const $products = productDomain
	.createStore<Product[]>([])
	.on(
		getProducts.doneData,
		(state, payload) => payload.products as ProductResponseDTO[]
	)
	.on(removeProduct.done, (state, { params }) =>
		state.filter(el => el.id !== params)
	)
	.on(updateProduct.doneData, (state, payload) =>
		state.map(el => (el.id === payload?.id ? payload : el))
	)
	.on(createProduct.doneData, (state, payload) => [...state, payload.product])

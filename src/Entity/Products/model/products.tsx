import * as api from "../api/Products"

import { type GetProductsResponse, type ProductResponseDTO } from "Shared/types"
import { createDomain, sample } from "effector"

const productDomain = createDomain()

export const createProduct = productDomain.createEffect(api.createProduct)
export const removeProduct = productDomain.createEffect(api.removeProduct)
export const updateProduct = productDomain.createEffect(api.updateProduct)
export const getProducts = productDomain.createEffect<
  api.IGetProducts,
  GetProductsResponse
>(api.getProducts)
export const setStep = productDomain.createEvent<number>()
export const clearError = productDomain.createEvent()

export const $products = productDomain
	.createStore<ProductResponseDTO[]>([])
	.on(getProducts.doneData, (state, payload) => payload.products ?? [])
	.on(removeProduct.done, (state, { params }) =>
		state.filter(el => el.id !== params)
	)
	.on(updateProduct.doneData, (state, payload) => {
		if (payload) {
			return state.map(el => (el.id === payload?.id ? payload : el))
		}
	})
	.on(createProduct.doneData, (state, payload) => [...state, payload.product])

export const $totalProducts = productDomain
	.createStore(0)
	.on(getProducts.doneData, (state, payload) => payload.totalItems)

export const $step = productDomain
	.createStore(1)
	.on(setStep, (state, payload) => payload)

export const $error = productDomain
	.createStore<string | null>(null)
	.on(createProduct.failData, () => "Не удалось создать продукт")
	.on(removeProduct.failData, () => "Не удалось удалить продукт")
	.on(updateProduct.failData, () => "Не удалось обновить продукт")
	.on(getProducts.failData, () => "Не удалось получить продукты продукт")
	.on(clearError, () => null)

$error.watch(() => {
	setTimeout(() => {
		clearError()
	}, 3000)
})

sample({
	clock: $step,
	source: $step,
	target: getProducts,
})

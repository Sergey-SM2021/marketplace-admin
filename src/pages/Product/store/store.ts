import { type ProductResponseDTO } from "Shared/types"

import { createDomain } from "effector"
import { api } from "../api"

const productDomain = createDomain()

export const getProductById = productDomain.createEffect<number, ProductResponseDTO>(api.getProductById)

export const $productStore = productDomain
	.createStore<ProductResponseDTO|null>(null)
	.on(getProductById.doneData, (_, payload) => payload)

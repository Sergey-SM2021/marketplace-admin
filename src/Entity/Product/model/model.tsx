import { type ProductResponseDTO } from "Shared/types"

import * as api from "../api/api"

import { createDomain } from "effector"

const productDomain = createDomain()

export const getProductById = productDomain.createEffect<
  number,
  ProductResponseDTO
>(api.getProductById)

export const $product = productDomain
	.createStore<ProductResponseDTO | null>(null)
	.on(getProductById.doneData, (state, payload) => payload)

import { type GetProductsResponse, type ProductResponseDTO } from "types"

import * as api from "../api/api"

import { createDomain } from "effector"

const productDomain = createDomain()

export const createProduct = productDomain.createEffect(api.createProduct)
export const removeProduct = productDomain.createEffect(api.removeProduct)
export const getProducts = productDomain.createEffect<
  void,
  GetProductsResponse
>(api.getProducts)

export const $products = productDomain
  .createStore<ProductResponseDTO[]>([])
  .on(
    getProducts.doneData,
    (state, payload) => payload.products as ProductResponseDTO[]
  )
  .on(removeProduct.done, (state, { params, result }) =>
    state.filter(el => el.id !== params)
  )

import { Product } from "types/models/Product"

import { api } from "./api/api"

import { createDomain } from "effector"

type TProducts = Array<Product>

export const ProductsDomain = createDomain()

export const setProducts = ProductsDomain.createEvent<Array<Product>>()

export const getProductById = ProductsDomain.createEffect(api.getProductById)

export const createProduct = ProductsDomain.createEffect(api.createProduct)

export const removeProduct = ProductsDomain.createEffect(api.removeProduct)

export const $products = ProductsDomain.createStore<{
  products: TProducts
  categoryName: string
}>({
  products: [],
  categoryName: "Игрушки",
})
  .on(getProductById.doneData, (state, payload) => ({
    ...state,
    products: [...state.products, payload],
  }))
  .on(removeProduct.done, (state, { params }) => ({
    ...state,
    products: state.products.filter(product => product.id !== params),
  }))
  .on(setProducts, (state, payload) => ({ ...state, products: payload }))

import { Product } from "types"

import { api } from "./api"

import { createDomain } from "effector"

const ProductsPageDomain = createDomain()

export const getProducts = ProductsPageDomain.createEffect(api.getProducts)

export const $ProductsPageStore = ProductsPageDomain.createStore<
  Array<Product>
>([]).on(getProducts.doneData, (_, payload) => {
  return ([...payload])
})

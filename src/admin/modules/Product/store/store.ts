import { Product } from "entity"

import { createDomain } from "effector"

const productDomain = createDomain()

export const getProductById = productDomain.createEffect<number, Product>()

export const $productStore = productDomain
  .createStore<Product>({
    name: "Холодильник",
    categoryId: 293,
    features: [],
    info: "Просто холодильник",
    price: 10000,
    rating: null,
    id: 78,
  })
  .on(getProductById.doneData, (_, payload) => payload)

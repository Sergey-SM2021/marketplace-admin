import { Product } from "entity"

import { createDomain } from "effector"
import { api } from "../api"

const productDomain = createDomain()

export const getProductById = productDomain.createEffect<number, Product>(api.getProductById)

export const $productStore = productDomain
  .createStore<Product|null>(null)
  .on(getProductById.doneData, (_, payload) => payload)

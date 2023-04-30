import * as api from "../api/api"

import { createDomain } from "effector"

const productDomain = createDomain()

export const createProduct = productDomain.createEffect(api.createProduct)

export const $products = productDomain

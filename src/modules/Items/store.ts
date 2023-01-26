import { Product } from "entity/models/Product"
import { createDomain } from "effector"
import { ProductResponseDTO } from "entity"
import { api } from "./api/api"
import axios from "axios"

type TProducts = Array<Product>

export const ProductsDomain = createDomain()

export const getProducts = ProductsDomain.createEffect(api.getProducts)

export const createProduct = ProductsDomain.createEffect<
  { url: string; payload: Product },
  ProductResponseDTO
>(async ({ payload, url }) => await axios.post(url, payload))

export const removeProduct = ProductsDomain.createEffect<string, any>(
  async url => axios.delete(url)
)

export const $products = ProductsDomain.createStore<{
  products: TProducts
  categoryName: string
}>({
  products: [],
  categoryName: "Игрушки",
})
  .on(createProduct.doneData, (state, payload) => ({
    ...state,
    products: [...state.products, payload],
  }))
  .on(getProducts.doneData, (state, payload) => ({
    ...state,
    products: payload,
  }))
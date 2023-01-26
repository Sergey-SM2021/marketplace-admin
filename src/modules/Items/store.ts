import { Product } from "entity/models/Product"
import { createDomain } from "effector"
import axios from "axios"
import { ProductResponseDTO } from "entity"

type TProducts = Array<Product>

export const ProductsDomain = createDomain()

export const getProducts = ProductsDomain.createEffect<string, TProducts>(
  async url => await (await axios.get(url)).data
)

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
  .on(getProducts.doneData, (state, payload) => ({
    ...state,
    products: payload,
  }))
  .on(createProduct.doneData, (state, payload) => ({
    ...state,
    products: [...state.products, payload],
  }))

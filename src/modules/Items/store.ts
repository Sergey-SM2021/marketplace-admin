import { Product } from "entity/models/Product"
import { createDomain, createEffect } from "effector"
import axios from "axios"
import { ProductResponseDTO } from "entity"

type TProducts = Array<Product>

export const ProductsDomain = createDomain()

const item: Product = {
  category: {
    name: "Холодильники",
  },
  categoryId: 98,
  features: [],
  id: 686,
  info: "info is hjsbcjhdsbcjd",
  name: "name",
  price: 67567,
  rating: 5,
}

export const getProducts = createEffect<string, TProducts>(
  async url => await (await axios.get(url)).data
)

export const createProduct = createEffect<{url:string, payload:Product }, ProductResponseDTO>(
  async ({payload,url}) => await axios.post(url,payload)
)

export const $products = ProductsDomain.createStore<{
  products: TProducts
  categoryName: string
}>({
  products: [item, item, item],
  categoryName: "Игрушки",
})
  .on(getProducts.doneData, (state, payload) => ({
    ...state,
    products: payload,
  }))
  .on(createProduct.doneData, (state, payload) => ({...state,products:[...state.products,payload]}))

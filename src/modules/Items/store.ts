import { Product } from "entity/models/Product"
import { createDomain, createEffect } from "effector"
import axios from "axios"

type TProducts = Array<Product>

export const ProductsDomain = createDomain()

const item: Product = {
  category: {},
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

export const $products = ProductsDomain.createStore<TProducts>([
  item,
  item,
  item,
]).on(getProducts.doneData, (_, payload) => payload)

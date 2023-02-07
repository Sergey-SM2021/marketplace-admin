import { Product } from "entity/models/Product"
import { createDomain } from "effector"
import { api } from "./api/api"
import { ProductResponseDTO } from "entity"

type TProducts = Array<Product>

export const ProductsDomain = createDomain()

export const getProducts = ProductsDomain.createEffect<number,Array<ProductResponseDTO>>(api.getProducts)

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
  .on(getProducts.doneData, (state, payload) => ({
    ...state,
    products: payload,
  }))
  .on(getProductById.doneData, (state, payload) => ({
    ...state,
    products: [...state.products, payload],
  }))
  .on(removeProduct.done, (state, { params }) => ({...state,products:state.products.filter(product => product.id !== params)}))

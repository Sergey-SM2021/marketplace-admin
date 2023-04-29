import { CancelablePromise, Product, ProductResponseDTO } from "types"

import axios from "axios"

export const api = {
  async getProducts(id: number) {
    return (
      await axios.get<CancelablePromise<Array<ProductResponseDTO>>>(
        `http://shopshop.somee.com/Shop/GetProductsByCategory/${id}`
      )
    ).data
  },

  async createProduct(payload: Product) {
    return (
      await axios.post<number>(
        "http://shopshop.somee.com/AdminPanel/CreateProduct",
        payload
      )
    ).data
  },

  async removeProduct(id: number) {
    return (
      await axios.delete<string>(
        `http://shopshop.somee.com/AdminPanel/DeleteProduct/${id}`
      )
    ).data
  },

  async getProductById(id: number) {
    return (
      await axios.get(`http://shopshop.somee.com/Shop/GetProductById?Id=${id}`)
    ).data
  },
}

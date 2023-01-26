import { Product } from "entity"
import { ProductResponseDTO } from "entity"
import axios from "axios"

export const api = {
  async getProducts() {
    return (
      await axios.get<ProductResponseDTO[]>(
        "http://shopshop.somee.com/Shop/GetProducts"
      )
    ).data
  },
  createProduct(payload: Product) {
    return axios.post<number>(
      "http://shopshop.somee.com/AdminPanel/CreateProduct",
      payload
    )
  },
  removeProduct(id: number) {
    return `http://shopshop.somee.com/AdminPanel/DeleteProduct/${id}`
  },
  // removeProduct(id: number){
  //   return `http://shopshop.somee.com/AdminPanel/DeleteProduct/${id}`
  // },
}

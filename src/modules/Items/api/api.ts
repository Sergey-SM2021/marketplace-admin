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
  
  async createProduct(payload: Product) {
    return (await axios.post<number>(
      "http://shopshop.somee.com/AdminPanel/CreateProduct",
      payload
    )).data
  },

  async removeProduct(id: number) {
    return (await axios.delete<string>(`http://shopshop.somee.com/AdminPanel/DeleteProduct/${id}`)).data
  },

  async getProductById(id:number){
    return (await axios.get(`http://shopshop.somee.com/Shop/GetProductById?Id=${id}`)).data
  }

}

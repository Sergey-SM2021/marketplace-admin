import { ProductResponseDTO } from 'entity';
import axios from "axios"

export const api = {
  async getProducts() {
    return (await axios.get<ProductResponseDTO[]>("http://shopshop.somee.com/Shop/GetProducts")).data
  },
  createProduct(){
    return "http://shopshop.somee.com/AdminPanel/CreateProduct" 
  },
  removeProduct(id: number){
    return `http://shopshop.somee.com/AdminPanel/DeleteProduct/${id}`
  },
}

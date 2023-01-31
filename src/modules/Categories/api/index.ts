import { Category } from "entity"
import axios from "axios"

export const api = {
  async getCategories() {
    return (
      await axios.get<Array<Category>>(
        "http://shopshop.somee.com/Shop/GetCategoriesTree"
      )
    ).data
  },
  async createCategory(payload: Category) {
    return (
      await axios.post<number>(
        "http://shopshop.somee.com/AdminPanel/CreateCategory",
        payload
      )
    ).data
  },
  async removeCategory(id: number) {
    return (
      await axios.delete<string>(
        `http://shopshop.somee.com/AdminPanel/DeleteCategory/${id}`
      )
    ).data
  },
}

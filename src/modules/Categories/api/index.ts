import {
  CancelablePromise,
  CategoryResponseDTO,
  CreateCategoryCommand,
} from "entity"
import axios from "axios"

export const api = {
  async getCategories() {
    return (
      await axios.get<CancelablePromise<Array<CategoryResponseDTO>>>(
        "http://shopshop.somee.com/Shop/GetCategoriesTree"
      )
    ).data
  },
  async createCategory(payload: CreateCategoryCommand) {
    return (
      await axios.post<CancelablePromise<number>>(
        "http://shopshop.somee.com/AdminPanel/CreateCategory",
        payload
      )
    ).data
  },
  async removeCategory(id: number) {
    return (
      await axios.delete<CancelablePromise<string>>(
        `http://shopshop.somee.com/AdminPanel/DeleteCategory/${id}`
      )
    ).data
  },
}

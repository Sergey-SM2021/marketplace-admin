import {
  CancelablePromise,
  Category,
  CategoryResponseDTO,
  CreateCategoryCommand,
} from "entity"
import { CreateProductCommand } from "entity/models/CreateProductCommand"

import axios from "axios"

const ConvertCatToCustomCat = (cat: Category): Category => {
  return {
    ...cat,
    childCategories: cat.childCategories
      ? cat.childCategories.map(chCat => ConvertCatToCustomCat(chCat))
      : [],
  }
}

interface IUpdateCategory {
  categoryId: number
  name: string
  parentCategoryId: number
}

export const api = {
  async getCategoriesTree() {
    const data = (
      await axios.get<CancelablePromise<Array<CategoryResponseDTO>>>(
        "http://shopshop.somee.com/Shop/GetCategoriesTree"
      )
    ).data
    return (await data).map(cat => ConvertCatToCustomCat(cat))
  },
  async createCategory(payload: CreateCategoryCommand) {
    return (
      await axios.post<CancelablePromise<Category>>(
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
  async updateCategory(category: IUpdateCategory) {
    return (
      await axios.put(
        `http://shopshop.somee.com/AdminPanel/EditCategory`,
        category
      )
    ).data
  },
  async createProduct(payload: CreateProductCommand) {
    return (
      await axios.post(
        "http://shopshop.somee.com/AdminPanel/CreateProduct",
        payload
      )
    ).data
  },
  async getCategories() {
    return (await axios.get("http://shopshop.somee.com/Shop/GetCategories"))
      .data
  },
  async editCategory(category: Category) {
    return (
      await axios.put<Category>(
        "http://shopshop.somee.com/AdminPanel/EditCategory",
        category
      )
    ).data
  },
}

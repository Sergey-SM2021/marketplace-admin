import { CreateProductCommand } from "./../../../entity/models/CreateProductCommand"
import {
  CancelablePromise,
  Category,
  CategoryResponseDTO,
  CreateCategoryCommand,
} from "entity"

import { ILocalCategory } from "../store/store"

import axios from "axios"

const ConvertCatToCustomCat = (cat: Category): ILocalCategory => {
  return {
    ...cat,
    isOpen: false,
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
  async getCategories() {
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
}

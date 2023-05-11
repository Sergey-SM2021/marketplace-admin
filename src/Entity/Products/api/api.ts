import {
  type CreateProductCommand,
  type GetProductsResponse,
} from "Shared/types"

import axios from "axios"

const instance = axios.create({
  baseURL: "http://jenya123-001-site1.dtempurl.com/",
})

export const createProduct = async (product: CreateProductCommand) => {
  return (await instance.post("AdminPanel/CreateProduct", product)).data
}

export const removeProduct = async (id: number) => {
  return (await instance.delete(`AdminPanel/DeleteProduct/${id}`)).data
}

export const getProducts = async () => {
  return (
    await instance.post<GetProductsResponse>(
      "Shop/GetProducts?pageSize=10&pageIndex=1",
      {
        price: {
          from: 0,
          to: 10000000,
        },
        rating: {
          from: 0,
          to: 0,
        },
        count: {
          from: 0,
          to: 0,
        },
        categoryIds: [],
      }
    )
  ).data
}

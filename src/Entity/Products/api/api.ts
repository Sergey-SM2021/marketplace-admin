import { type CreateProductCommand } from "types"

import axios from "axios"

const instance = axios.create({
  baseURL: "http://jenya123-001-site1.dtempurl.com/",
})

export const createProduct = async (product: CreateProductCommand) => {
  return (await instance.post("AdminPanel/CreateProduct", product)).data
}

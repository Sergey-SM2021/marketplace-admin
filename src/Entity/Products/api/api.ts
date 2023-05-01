import { type ProductResponseDTO, type CreateProductCommand } from "types"

import axios from "axios"

const instance = axios.create({
  baseURL: "http://jenya123-001-site1.dtempurl.com/",
})

export const createProduct = async (product: CreateProductCommand) => {
  return (await instance.post("AdminPanel/CreateProduct", product)).data
}

export const removeProduct = async (id: number) => {
  return (await instance.delete(`AdminPanel/CreateProduct/${id}`)).data
}

export const getProducts = async () => {
  return (await instance.get<ProductResponseDTO[]>("Shop/GetProducts")).data
}
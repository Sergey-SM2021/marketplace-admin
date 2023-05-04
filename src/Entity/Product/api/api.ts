import { type ProductResponseDTO } from "types"

import axios from "axios"

const instance = axios.create({
  baseURL: "http://jenya123-001-site1.dtempurl.com/",
})

export const getProductById = async (id: number) => {
  return (await instance.get<ProductResponseDTO>(`Shop/GetProductById?Id=${id}`))
    .data
}

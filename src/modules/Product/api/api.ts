import { ProductResponseDTO } from "entity"

import axios from "axios"

export const getProductById = async (id: number) => {
  return (
    await axios.get<ProductResponseDTO>(
      `http://shopshop.somee.com/Shop/GetProductById?Id=${id}`
    )
  ).data
}

import { CancelablePromise, ProductResponseDTO } from "entity"

import axios from "axios"

export const api = {
  async getProducts() {
    return (
      await axios.get<CancelablePromise<Array<ProductResponseDTO>>>(
        `http://shopshop.somee.com/Shop/GetProducts`
      )
    ).data
  },
}

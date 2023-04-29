import { CancelablePromise, ProductResponseDTO } from "types"

import axios from "axios"

export const api = {
  async getProducts() {
    return (
      await axios.get<CancelablePromise<Array<ProductResponseDTO>>>(
        `http://jenya123-001-site1.dtempurl.com/Shop/GetProducts`
      )
    ).data
  },
}

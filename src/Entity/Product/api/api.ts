import { type ProductResponseDTO } from "Shared/types"

import axios from "axios"

const instance = axios.create({
	baseURL: "http://shopyshopy-001-site1.atempurl.com/",
})

export const getProductById = async (id: number) => {
	return (await instance.get<ProductResponseDTO>(`Shop/GetProductById?Id=${id}`))
		.data
}

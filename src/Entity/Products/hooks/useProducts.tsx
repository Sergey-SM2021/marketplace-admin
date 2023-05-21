import { $products, getProducts } from "../model/products"

import { useStore } from "effector-react"
import { useEffect } from "react"

export const useProducts = () => {
	const products = useStore($products)
	const isLoading = useStore(getProducts.pending)

	useEffect(() => {
		getProducts({})
	}, [])

	return { products, isLoading }
}

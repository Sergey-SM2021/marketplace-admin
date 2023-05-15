import { useStore } from "effector-react"
import { useEffect } from "react"
import { $products, getProducts } from "../model/model"

export const useProducts = () => {
	const products = useStore($products)

	useEffect(() => {
		getProducts()
	}, [])

	return products
}

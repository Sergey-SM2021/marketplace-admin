import {
	createProduct,
	removeProduct,
	updateProduct,
} from "Entity/Products/model/products"

import { useStore } from "effector-react"

export const useProductsLoading = () => {
	const pendingRemoveProduct = useStore(removeProduct.pending)
	const pendingCreateProduct = useStore(createProduct.pending)
	const pendingUpdateProduct = useStore(updateProduct.pending)
	return pendingRemoveProduct || pendingCreateProduct || pendingUpdateProduct
}

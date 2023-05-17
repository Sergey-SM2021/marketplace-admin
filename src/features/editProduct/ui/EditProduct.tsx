import { useCategories } from "Entity/Categories/hooks/useCategories"
import {
	$paramsByCategory,
	getParamsByCategory,
} from "Entity/Params/store/paramsByCategory"
import { createProduct } from "Entity/Products/model/model"
import { SubmitedValue } from "Entity/Products/ui/ProductTamplate/type/ProductTamplate"
import { ProductTamplate } from "Entity/Products/ui/ProductTamplate/ui/ProductTamplate"

import { Button, useDisclosure } from "@chakra-ui/react"
import { useStore } from "effector-react"
import { memo, useEffect, useState } from "react"

export const EditProduct = memo(() => {
	const categories = useCategories()
	const params = useStore($paramsByCategory)
	const [categoryId, setCategoryId] = useState<number>(categories[0]?.id)

	useEffect(() => {
		if (categoryId) {
			getParamsByCategory(categoryId)
		}
	}, [categoryId])

	const { isOpen, onClose, onOpen } = useDisclosure()

	const handlerSubmit = (value: SubmitedValue) => {
		createProduct({ ...value, featureValue: [{ id: 9, value: "jk" }] })
	}

	return (
		<>
			{isOpen ? (
				<ProductTamplate
					setCategoryId={setCategoryId}
					params={categoryId ? params : []}
					categories={categories}
					isOpen={isOpen}
					onClose={onClose}
					onSubmit={handlerSubmit}
				/>
			) : null}
			<Button onClick={onOpen}>{isOpen}Создать продукт</Button>
		</>
	)
})

EditProduct.displayName = "EditProduct"

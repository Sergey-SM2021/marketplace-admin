import { useCategories } from "Entity/Categories/hooks/useCategories"
import {
	$paramsByCategory,
	getParamsByCategory,
} from "Entity/Params/store/paramsByCategory"
import { ProductTamplate } from "Entity/Product/ui/ProductTamplate/ui/ProductTamplate"
import { createProduct } from "Entity/Products/model/model"
import { SubmitedValue } from "Entity/Product/ui/ProductTamplate/type/ProductTamplate"

import { Button, useDisclosure } from "@chakra-ui/react"
import { useStore } from "effector-react"
import { memo, useEffect, useState } from "react"

export const CreateProduct = memo(() => {
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
		createProduct({ ...value, featureValue: [{ id: 9, value: "jk" }]})
	}

	return (
		<>
			<ProductTamplate
				setCategoryId={setCategoryId}
				params={categoryId ? params : []}
				categories={categories}
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={handlerSubmit}
			/>
			<Button onClick={onOpen}>{isOpen}Создать продукт</Button>
		</>
	)
})

CreateProduct.displayName = "CreateProduct"

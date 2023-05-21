import { useProducts } from "Entity/Products/hooks/useProducts"
import {
	$error,
	$filters,
	$step,
	$totalProducts,
	createProduct,
	getProducts,
	setStep,
	updateProduct,
} from "Entity/Products/model/products"

import { useProductsLoading } from "../hooks/Products"
import { ProductsTable } from "./ProductsTable"

import { Button, HStack, Box, useDisclosure, Flex } from "@chakra-ui/react"
import { EditProductCommand, Product } from "Shared/types"
import { DisplayError } from "Shared/ui/DisplayError"
import { Pending } from "Shared/ui/Pending/Pending"
import { useStore } from "effector-react"
import { CreateProduct } from "features/createProduct"
import { RemoveProduct } from "features/removeProduct/ui/RemoveProduct"
import { useState, useEffect, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import { v4 } from "uuid"
import { Filter } from "widgets/Filter/Filter"

//FIXME: RemoveProduct вполне можно обойтись и без пропсов - вынести всё в фичу

//FIXME: После добавления продукта пагинация не сразу аптейдится

//FIXME: если мы отредактировали продукт, потом открыли его снова - у нас атрибуты пустые
const ProductsPage = () => {
	const [editProduct, setEditProduct] = useState<Product>()
	const currentStep = useStore($step)
	const filters = useStore($filters)
	const nav = useNavigate()

	const handlerRemove = (e: MouseEvent<HTMLButtonElement>, id: number) => {
		e.stopPropagation()
		SetProductIdToRemove(id)
		remove.onOpen()
	}

	const handlerProductClick = (id: number) => {
		nav(`/product/${id}`)
	}

	const handlerEdit = (e: MouseEvent, product: Product) => {
		e.stopPropagation()
		setEditProduct(product)
	}

	const productsLoading = useProductsLoading()
	const [productIdToRemove, SetProductIdToRemove] = useState<number | null>(
		null
	)

	const handlerBackClick = () => {
		nav(-1)
	}

	const remove = useDisclosure()

	const create = useDisclosure()

	const edit = useDisclosure()

	useEffect(() => {
		if (editProduct) {
			edit.onOpen()
		}
	}, [editProduct])

	const onEdit = (product: EditProductCommand) => {
		updateProduct({ ...product, productId: product.productId })
	}

	const { products, isLoading } = useProducts()

	const pageCount = Math.ceil(useStore($totalProducts) / 5)

	const handlerStep = (step: number) => {
		setStep(step)
	}

	useEffect(() => {
		getProducts({ pageIndex: currentStep, categoryIds: filters })
	}, [currentStep, filters])

	const error = useStore($error)

	return (
		<>
			{error ? <DisplayError>{error}</DisplayError> : null}
			{productsLoading ? <Pending /> : null}
			{create.isOpen ? (
				<CreateProduct
					action="создать"
					isOpen={create.isOpen}
					onClose={create.onClose}
					onSubmit={data => {
						createProduct(data)
					}}
				/>
			) : null}
			{edit.isOpen ? (
				<CreateProduct
					action="Изменить"
					isOpen={edit.isOpen}
					onClose={() => {
						edit.onClose()
						setEditProduct()
					}}
					onSubmit={onEdit}
					product={editProduct}
				/>
			) : null}
			<RemoveProduct
				isOpen={remove.isOpen}
				productId={productIdToRemove as number}
				onClose={remove.onClose}
			/>
			<Box p={3} h={"100%"}>
				<Flex gap={3} h={"100%"}>
					<Filter />
					<Box flexGrow={1}>
						<HStack>
							<Button onClick={handlerBackClick}>Назад</Button>
							<Button onClick={create.onOpen}>Создать продукт</Button>
						</HStack>
						<ProductsTable
							products={products}
							isLoading={isLoading}
							handlerEdit={handlerEdit}
							handlerProductClick={handlerProductClick}
							handlerRemove={handlerRemove}
						/>
						<HStack>
							{new Array(pageCount).fill("").map((el, i) => (
								<Button
									key={v4()}
									colorScheme={currentStep === i + 1 ? "red" : "facebook"}
									onClick={() => handlerStep(i + 1)}>
									{i + 1}
								</Button>
							))}
						</HStack>
					</Box>
				</Flex>
			</Box>
		</>
	)
}

export default ProductsPage

import { createProduct, updateProduct } from "Entity/Products/model/products"

import { useProductsLoading } from "../hooks/Products"
import { ProductsTable } from "./ProductsTable"

import { Button, HStack, Box, useDisclosure } from "@chakra-ui/react"
import { EditProductCommand, Product } from "Shared/types"
import { CreateProduct } from "features/createProduct"
import { RemoveProduct } from "features/removeProduct/ui/RemoveProduct"
import { useState, useEffect, MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Pending } from "Shared/ui/Pending/Pending"

const ProductsPage = () => {
	const [editProduct, setEditProduct] = useState<Product>()
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

	return (
		<>
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
			<Box p={3}>
				<HStack>
					<Button onClick={handlerBackClick}>Назад</Button>
					<Button onClick={create.onOpen}>Создать продукт</Button>
				</HStack>
				<ProductsTable
					handlerEdit={handlerEdit}
					handlerProductClick={handlerProductClick}
					handlerRemove={handlerRemove}
				/>
			</Box>
		</>
	)
}

export default ProductsPage

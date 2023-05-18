import { useProducts } from "Entity/Products/hooks/useProducts"
import { createProduct, updateProduct } from "Entity/Products/model/model"

import {
	Button,
	Flex,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	HStack,
	Box,
	useDisclosure,
	chakra,
	Skeleton,
	VStack,
} from "@chakra-ui/react"
import { EditProductCommand, Product } from "Shared/types"
import { CreateProduct } from "features/createProduct"
import { RemoveProduct } from "features/removeProduct/ui/RemoveProduct"
import { useState, type MouseEvent, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { v4 } from "uuid"

const TH = chakra(Th, {
	baseStyle: {
		background: "#96f",
		color: "#fff",
		_first: { borderRadius: "10px 0 0 10px" },
		_last: { borderRadius: "0 10px 10px 0" },
	},
})

const TD = chakra(Td, {
	baseStyle: {
		background: "#fff",
		color: "#000",
		_first: { borderRadius: "10px 0 0 10px" },
		_last: { borderRadius: "0 10px 10px 0" },
	},
})

const ProductsPage = () => {
	const [productIdToRemove, SetProductIdToRemove] = useState<number | null>(
		null
	)

	const [editProduct, setEditProduct] = useState<Product>()

	const nav = useNavigate()

	const handlerBackClick = () => {
		nav(-1)
	}

	const remove = useDisclosure()

	const { products, isLoading } = useProducts()

	const handlerRemove = (e: MouseEvent<HTMLButtonElement>, id: number) => {
		e.stopPropagation()
		SetProductIdToRemove(id)
		remove.onOpen()
	}

	const handlerProductClick = (id: number) => {
		nav(`/product/${id}`)
	}

	const create = useDisclosure()

	const edit = useDisclosure()

	const handlerEdit = (e: MouseEvent, product: Product) => {
		e.stopPropagation()
		setEditProduct(product)
	}

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
				{!isLoading ? (
					<TableContainer>
						<Table
							variant="simple"
							style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}>
							<Thead>
								<Tr>
									{["id", "name", "price"].map(el => (
										<TH key={el}>{el}</TH>
									))}
									<TH colSpan={2}>
										<Flex justify={"center"}>action</Flex>
									</TH>
								</Tr>
							</Thead>
							<Tbody>
								{products.map(product => (
									<Tr
										key={product.id}
										onClick={() => {
											handlerProductClick(product.id as number)
										}}>
										{[product.id, product.name, product.price].map(el => (
											<TD key={el}>{el}</TD>
										))}
										<TD>
											<Button
												onClick={e => {
													handlerRemove(e, product.id as number)
												}}>
                        Delete
											</Button>
										</TD>
										<TD>
											<Button onClick={e => handlerEdit(e, product)}>
                        Edit
											</Button>
										</TD>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				) : (
					<VStack gap={5} mt={3}>
						<Skeleton w={"full"}>Header</Skeleton>
						{new Array(10).fill("").map(el => <Skeleton key={v4()} w={"full"} h={39}>Row</Skeleton>)}
					</VStack>
				)}
			</Box>
		</>
	)
}

export default ProductsPage

import { useProducts } from "Entity/Products/hooks/useProducts"

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
} from "@chakra-ui/react"
import { CreateProduct } from "features/createProduct"
import { RemoveProduct } from "features/removeProduct/ui/RemoveProduct"
import { useState, type MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import { createProduct } from "Entity/Products/model/model"

const ProductsPage = () => {
	const [productIdToRemove, SetProductIdToRemove] = useState<number | null>(
		null
	)

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

	const handlerProductClick = (id: number) => {
		nav(`/product/${id}`)
	}

	const { isOpen, onClose, onOpen } = useDisclosure()

	return (
		<>
			<CreateProduct
				action="создать"
				isOpen={isOpen}
				onClose={onClose}
				onSubmit={data => {createProduct(data)}}
			/>
			<RemoveProduct
				isOpen={remove.isOpen}
				productId={productIdToRemove as number}
				onClose={remove.onClose}
			/>
			<Box p={3}>
				<HStack>
					<Button onClick={handlerBackClick}>Назад</Button>
					<Button onClick={onOpen}>Создать продукт</Button>
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
											<Button>Edit</Button>
										</TD>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				) : (
					<div>прелоадер</div>
				)}
			</Box>
		</>
	)
}

export default ProductsPage

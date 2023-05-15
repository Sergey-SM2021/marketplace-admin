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
import { CreateProduct } from "features/createProduct/ui/CreateNewItem"
import { EditProduct } from "features/editProduct/ui/editProduct"
import { RemoveProduct } from "features/removeProduct/ui/RemoveProduct"
import { useState, type MouseEvent } from "react"
import { useNavigate } from "react-router-dom"

const ProductsPage = () => {
	const [productIdToRemove, SetProductIdToRemove] = useState<number | null>(
		null
	)

	const nav = useNavigate()

	const handlerBackClick = () => {
		nav(-1)
	}

	const create = useDisclosure()

	const remove = useDisclosure()

	const edit = useDisclosure()

	const products = useProducts()

	const handlerRemove = (e: MouseEvent<HTMLButtonElement>, id: number) => {
		e.stopPropagation()
		SetProductIdToRemove(id)
		remove.onOpen()
	}

	const handlerEdit = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		create.onOpen()
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

	return (
		<>
			<RemoveProduct
				isOpen={remove.isOpen}
				productId={productIdToRemove as number}
				onClose={remove.onClose}
			/>
			<CreateProduct onClose={create.onClose} isOpen={create.isOpen} />
			<EditProduct onClose={edit.onClose} isOpen={edit.isOpen} />
			<Box p={3}>
				<HStack>
					<Button onClick={handlerBackClick}>Назад</Button>
					<Button onClick={create.onOpen}>Создать новый продукт</Button>
				</HStack>
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
										<Button onClick={handlerEdit}>Edit</Button>
									</TD>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
		</>
	)
}

export default ProductsPage

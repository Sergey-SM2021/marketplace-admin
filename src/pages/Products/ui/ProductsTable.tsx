import { useProducts } from "Entity/Products/hooks/useProducts"

import {
	Box,
	Button,
	Flex,
	Heading,
	Table,
	TableContainer,
	Tbody,
	Thead,
	Tr,
} from "@chakra-ui/react"
import { Product, ProductResponseDTO } from "Shared/types"
import { Loader } from "Shared/ui/Loader/Loader"
import { TD, TH } from "Shared/ui/TD"
import { MouseEvent } from "react"

interface ProductsTableProps {
  handlerProductClick: (id: number) => void
  handlerRemove: (e: MouseEvent<HTMLButtonElement>, id: number) => void
  handlerEdit: (e: MouseEvent, product: Product) => void
  products: ProductResponseDTO[]
  isLoading: boolean
}

export const ProductsTable = ({
	handlerEdit,
	handlerProductClick,
	handlerRemove,
	products,
	isLoading,
}: ProductsTableProps) => {
	if (isLoading) {
		return <Loader />
	}

	if (!products.length) {
		return (
			<Box mt={3}>
				<Heading>Пока нет продуктов</Heading>
			</Box>
		)
	}

	return (
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
								<Button onClick={e => handlerEdit(e, product)}>Edit</Button>
							</TD>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	)
}

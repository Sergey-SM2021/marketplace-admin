import { $product, getProductById } from "Entity/Product/model/model"

import { Counter } from "pages/Product/components/Counter"
import { FullMedia } from "pages/Product/components/FullMedia"
import { Header } from "pages/Product/components/Header"
import { Slider } from "pages/Product/components/Slider"

import {
	Button,
	Heading,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	chakra,
} from "@chakra-ui/react"
import { type ProductResponseDTO } from "Shared/types"
import { useStore } from "effector-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

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

export const ProductPage = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const product = useStore<ProductResponseDTO | null>($product)

	const { id } = useParams()

	useEffect(() => {
		if (id) {
			getProductById(Number(id))
		}
	}, [id])

	const handlerScaleing = () => {
		setIsOpen(true)
	}

	const handlerUnScaleing = () => {
		setIsOpen(false)
	}

	if (!id) {
		return null
	}

	const handlerAddMedia = () => {
		alert("hi")
	}

	return (
		<>
			{isOpen ? <FullMedia onClose={handlerUnScaleing} /> : null}
			<div className="w-full min-h-full p-4">
				<Header productName={product?.name ?? "name"} />
				<div className="bg-white rounded p-4 grid grid-cols-3 gap-4">
					<Slider onAddMedia={handlerAddMedia} onScaleing={handlerScaleing} />
					<div>
						<div>price: {product?.price}</div>
						<div>id: {product?.id}</div>
						<Counter />
						<div className="grid gap-4 grid-cols-2">
							<Button>Edit</Button>
							<Button>Remove</Button>
						</div>
					</div>
					<TableContainer>
						<Table variant="unstyled">
							<Thead>
								<Tr>
									{["параметры", "значение"].map(el => (
										<TH key={el}>{el}</TH>
									))}
								</Tr>
							</Thead>
							<Tbody>
								{product?.features?.map(el => (
									<Tr key={el.featureId}>
										<TD>{el.name}</TD>
										<TD>{el.value}</TD>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
					<div>
						<Heading>Описание</Heading>
						<div>{product?.info}</div>
					</div>
				</div>
			</div>
		</>
	)
}

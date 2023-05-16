import { AttributesTable } from "./components/AttributesTable"
import { Counter } from "./components/Counter"
import { FullMedia } from "./components/FullMedia"
import { Header } from "./components/Header"
import { Slider } from "./components/Slider"
import { $productStore, getProductById } from "./store/store"

import { Button, Heading } from "@chakra-ui/react"
import { type ProductResponseDTO } from "Shared/types"
import { useStore } from "effector-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { v4 } from "uuid"

export const Product = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const product = useStore<ProductResponseDTO | null>($productStore)
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
	const handlerRowClick = () => {
		alert("handlerRowClick")
	}
	const addMediaHandler = () => {
		alert("handlerRowClick")
	}
	if (!id) {
		return null
	}
	return (
		<>
			{isOpen ? <FullMedia onClose={handlerUnScaleing} /> : null}
			<div className="w-full min-h-full p-4">
				<Header productName={product?.name ?? "name"} />
				<div className="bg-white rounded p-4 grid grid-cols-3 gap-4">
					<Slider onAddMedia={addMediaHandler} onScaleing={handlerScaleing} />
					<div>
						<div>price: {product?.price}</div>
						<div>id: {product?.id}</div>
						<Counter />
						<div className="grid gap-4 grid-cols-2">
							<Button>Edit</Button>
							<Button>Remove</Button>
						</div>
					</div>
					<AttributesTable
						BodyTableRowClickHandler={handlerRowClick}
						BodyTableRows={
							product?.features?.map(el => ({
								cols: [
									<div key={v4()}>edit</div>,
									<div key={v4()}>{el.name}</div>,
									<div key={v4()}>{el.value}</div>,
								],
								id: 9,
							})) != null || []
						}
						HeaderTableRow={["", "key", "value"]}
					/>
					<div>
						<Heading>Описание</Heading>
						<div>{product?.info}</div>
					</div>
				</div>
			</div>
		</>
	)
}

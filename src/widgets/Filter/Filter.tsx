import {
	$categoriesTree,
	getCategoriesTree,
} from "Entity/CategoriesTree/store/CategoriesTree"
import { RenderCategoryDemo } from "Entity/CategoriesTree/ui/RenderCategoryDemo"
import {
	$fromPrice,
	$toPrice,
	setFilters,
	setFromPriceFilter,
	setPriceFilter,
	setToPriceFilter,
} from "Entity/Products/model/products"

import {
	Box,
	Card,
	Flex,
	Input,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	RangeSliderTrack,
	Text,
} from "@chakra-ui/react"
import { useStore } from "effector-react"
import { FormEvent, useEffect } from "react"

export const Filter = () => {
	const fromPrice = useStore($fromPrice)
	const toPrice = useStore($toPrice)

	const categoriesTree = useStore($categoriesTree)

	useEffect(() => {
		getCategoriesTree()
	}, [])

	const handlerChangeCategory = (categoryId: number) => {
		setFilters(categoryId)
	}

	const handleChengePriceFilter = (price: [number, number]) => {
		setPriceFilter(price)
	}

	const handlerSetFromValue = (e:FormEvent<HTMLInputElement>) => {
		setFromPriceFilter(e.currentTarget.value)
	}

	const handlerSetToValue = (e:FormEvent<HTMLInputElement>) => {
		setToPriceFilter(e.currentTarget.value)
	}

	return (
		<Card p={3} width={"300px"}>
			<Flex flexDirection={"column"} gap={30} w={"full"}>
				<Box>
					<Text>Цена</Text>
					<RangeSlider
						onChange={handleChengePriceFilter}
						value={[fromPrice, toPrice]}
						min={0}
						max={100000}>
						<RangeSliderTrack>
							<RangeSliderFilledTrack />
						</RangeSliderTrack>
						<RangeSliderThumb index={0}>
							<Box></Box>
						</RangeSliderThumb>
						<RangeSliderThumb index={1}>
							<Box></Box>
						</RangeSliderThumb>
					</RangeSlider>
					<Flex justify={"space-between"}>
						<Input width={"100px"} value={fromPrice} onChange={handlerSetFromValue}/>
						<Input width={"100px"} value={toPrice} onChange={handlerSetToValue}/>
					</Flex>
				</Box>
				<Box>
					{categoriesTree.map(el => (
						<RenderCategoryDemo
							onChange={handlerChangeCategory}
							key={el.id}
							category={el}
						/>
					))}
				</Box>
			</Flex>
		</Card>
	)
}

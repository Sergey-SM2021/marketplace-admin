import {
	$categoriesTree,
	getCategoriesTree,
} from "Entity/CategoriesTree/store/CategoriesTree"
import { RenderCategoryDemo } from "Entity/CategoriesTree/ui/RenderCategoryDemo"

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
import { useEffect } from "react"

export const Filter = () => {
	const categoriesTree = useStore($categoriesTree)
	
	useEffect(() => {
		getCategoriesTree()
	}, [])
	
	return (
		<Card p={3} width={"300px"}>
			<Text>Price</Text>
			<RangeSlider>
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
				<Input width={"100px"} />
				<Input width={"100px"} />
			</Flex>
			{categoriesTree.map(el => (
				<RenderCategoryDemo
					onChange={id => {
						alert(id)
					}}
					key={el.id}
					category={el}
				/>
			))}
		</Card>
	)
}

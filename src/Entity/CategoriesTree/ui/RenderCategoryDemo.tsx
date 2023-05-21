import { Box, Checkbox, Flex, useDisclosure } from "@chakra-ui/react"
import { Category } from "Shared/types"

interface IRenderCategoryDemo {
  category: Category
  onChange: (categoryId: number) => void
}

export const RenderCategoryDemo = ({
	category,
	onChange,
}: IRenderCategoryDemo) => {
	const { isOpen, onToggle } = useDisclosure()

	return (
		<Box>
			<Flex gap={3} onClick={onToggle}>
				{category.childCategories?.length ? (
					<Box>{isOpen ? "-" : "+"}</Box>
				) : null}
				<label>
					{!category.childCategories?.length ? (
						<Checkbox
							onChange={() => {
								onChange(category.id as number)
							}}
						/>
					) : null}
					{category.name}
				</label>
			</Flex>
			{category.childCategories?.length && isOpen
				? category.childCategories.map(el => (
					<RenderCategoryDemo
						category={el}
						onChange={() => {
							onChange(category.id as number)
						}}
						key={el.id}
					/>
				))
				: null}
		</Box>
	)
}

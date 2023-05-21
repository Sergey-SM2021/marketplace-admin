import { Box, Checkbox, Flex, useDisclosure } from "@chakra-ui/react"
import { ReactComponent as Collapse } from "Shared/assets/expand_more_FILL0_wght400_GRAD0_opsz48.svg"
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
		<Box px={3} _notLast={{ pb: "3" }}>
			<Flex gap={3} onClick={onToggle}>
				{category.childCategories?.length ? (
					<Box>
						{isOpen ? (
							<Box transform={"rotate(270deg)"}>
								<Collapse width={"20px"} height={"20px"} />
							</Box>
						) : (
							<Collapse width={"20px"} height={"20px"} />
						)}
					</Box>
				) : null}
				<label>
					<Flex gap={3}>
						{!category.childCategories?.length ? (
							<Checkbox
								_notLast={{ pb: "3" }}
								onChange={() => {
									onChange(category.id as number)
								}}
							/>
						) : null}
						{category.name}
					</Flex>
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

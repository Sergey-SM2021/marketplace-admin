import { addParamToTree, removeCategoryParam } from "../store/CategoriesTree"

import {
	Flex,
	Td,
	chakra,
	Button,
	Tag,
	TagLabel,
	TagCloseButton,
	Tr,
	Box,
} from "@chakra-ui/react"
import { ReactComponent as Collapse } from "Shared/assets/collapse.svg"
import { type Category } from "Shared/types"
import { type SyntheticEvent, useState, memo } from "react"
import { v4 } from "uuid"

interface IRenderCategory {
  category: Category
  onRemove: (id: number) => void
  onEdit: (category: Category) => void
  deep: number
}

const TD = chakra(Td, {
	baseStyle: {
		background: "#fff",
		color: "#000",
		_first: { borderRadius: "10px 0 0 10px" },
		_last: { borderRadius: "0 10px 10px 0" },
	},
})

export const RenderCategory = memo((props: IRenderCategory) => {
	const { category, onEdit, deep, onRemove } = props

	const [isOpen, SetIsOpen] = useState(false)

	const handlerEdit = (e: SyntheticEvent, category: Category) => {
		e.stopPropagation()
		onEdit(category)
	}

	const { name, id } = category

	const onDragOver = (e: SyntheticEvent<HTMLTableRowElement>) => {
		e.preventDefault()
	}

	const onDrop = (
		e: SyntheticEvent<HTMLTableRowElement>,
		category: Category
	) => {
		e.preventDefault()
		addParamToTree(category)
	}

	const handlerRemoveParam = (id: number) => {
		removeCategoryParam(id)
	}

	return (
		<>
			<Tr
				h={"100%"}
				onDragOver={onDragOver}
				onDrop={e => {
					onDrop(e, category)
				}}>
				{category.childCategories?.length ? (
					<Td p={0} m={0} h={"100%"}>
						<Flex
							align={"center"}
							justify={"center"}
							style={{
								marginLeft: deep * 10,
								width: "100%",
								height: "100%",
								background: "#fff",
								borderRadius: "10px 0 0 10px",
							}}>
							<Box
								transform={isOpen ? "rotate(90deg)" : "rotate(180deg)"}
								transition={".5s"}
								bg={"gray.100"}
								borderRadius={"full"}
								_hover={{cursor:"pointer", bg: "gray.300"}}>
								<Collapse
									onClick={e => {
										SetIsOpen(prev => !prev)
									}}
								/>
							</Box>
						</Flex>
					</Td>
				) : (
					<Td
						p={0}
						m={0}
						sx={{
							height: "100%",
						}}>
						<Flex
							align={"center"}
							justify={"center"}
							w={"100%"}
							h={"100%"}
							bg={"#fff"}
							sx={{
								marginLeft: deep * 10,
								borderRadius: "10px 0 0 10px",
							}}></Flex>
					</Td>
				)}
				{[id, name].map(el => (
					<TD key={v4()}>{el}</TD>
				))}
				<TD>
					<Flex gap={3}>
						{category.features?.map(f => (
							<Tag colorScheme="green" key={v4()}>
								<TagLabel>{f.name}</TagLabel>
								<TagCloseButton
									onClick={() => {
										handlerRemoveParam(f.id as number)
									}}
								/>
							</Tag>
						))}
					</Flex>
				</TD>
				<TD>
					<Button
						colorScheme="facebook"
						onClick={() => {
							onRemove(id as number)
						}}>
            remove
					</Button>
				</TD>
				<TD>
					<Button
						onClick={e => {
							handlerEdit(e, category)
						}}
						colorScheme="facebook">
            edit
					</Button>
				</TD>
			</Tr>
			{isOpen
				? category?.childCategories?.map(el => (
					<RenderCategory
						{...props}
						key={v4()}
						deep={deep + 5}
						category={el}
					/>
				))
				: null}
		</>
	)
})

RenderCategory.displayName = "RenderCategory"

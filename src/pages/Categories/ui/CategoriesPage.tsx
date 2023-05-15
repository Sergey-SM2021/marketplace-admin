import { useCategories } from "Entity/Categories/hooks/useCategories"
import { useCategoriesTree } from "Entity/CategoriesTree/hooks/useCategoriesTree"
import { addCategory, updateCategory } from "Entity/CategoriesTree/store/store"
import { RenderCategory } from "Entity/CategoriesTree/utils"
import { ParamsManager } from "Entity/Params/ui/ParamsManager/ParamsManager"

import {
	Box,
	Button,
	Flex,
	Table,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tr,
	chakra,
	useDisclosure,
} from "@chakra-ui/react"
import { type Category } from "Shared/types"
import { CategoryTamplate, IForm } from "Shared/ui/CategoryTamplate/index"
import { RemoveCategory } from "features/removeCategory/ui/removeCategory"
import { useState, type FC } from "react"

const TH = chakra(Th, {
	baseStyle: {
		background: "#96f",
		color: "#fff",
		_first: { borderRadius: "10px 0 0 10px" },
		_last: { borderRadius: "0 10px 10px 0" },
	},
})

const CategoriesPage: FC = () => {
	const create = useDisclosure()
	const remove = useDisclosure()

	const categoriesTree = useCategoriesTree()
	const categories = useCategories()

	const [RemoveCategoryId, setRemoveCategoryId] = useState<null | number>(null)

	const [category, setCategory] = useState<undefined | Category>()

	const handlerRemoveCategory = (id: number) => {
		setRemoveCategoryId(id)
		remove.onOpen()
	}

	const handlerEditCategory = (category: Category) => {
		setCategory(category)
		create.onOpen()
	}

	const handlerCreateCategory = ({ name, parentCategoryId }: IForm) => {
		category
			? updateCategory({ name, parentCategoryId, categoryId: category.id })
			: addCategory({ name, parentCategoryId, features: [] })
	}

	const handlerCloseModal = () => {
		setCategory(undefined)
		create.onClose()
	}

	return (
		<Flex flexDirection={"column"} flex={"1 1 auto"} p={3}>
			<RemoveCategory
				categoryId={RemoveCategoryId as number}
				isOpen={remove.isOpen}
				onClose={remove.onClose}
			/>
			{create.isOpen ? (
				<CategoryTamplate
					categories={categories}
					submitHandler={handlerCreateCategory}
					title="Создать Категорию"
					isOpen={create.isOpen}
					onClose={handlerCloseModal}
					category={category}
				/>
			) : null}
			<Box>
				<Button colorScheme="facebook" onClick={create.onOpen}>
          Создать категорию
				</Button>
			</Box>
			<Flex gap={3} flexGrow={"1"}>
				<TableContainer flexGrow={1}>
					<Table
						variant="unstyled"
						style={{ borderCollapse: "separate", borderSpacing: "0 1em" }}>
						<Thead>
							<Tr borderRadius={3}>
								{["", "id", "наименование", "парметры"].map(el => (
									<TH key={el}>{el}</TH>
								))}
								<TH colSpan={2}>
									<Flex justify={"center"}>action</Flex>
								</TH>
							</Tr>
						</Thead>
						<Tbody>
							{categoriesTree.map(category => (
								<RenderCategory
									category={category}
									onEdit={handlerEditCategory}
									onRemove={handlerRemoveCategory}
									deep={0}
									key={category.id}
								/>
							))}
						</Tbody>
					</Table>
				</TableContainer>
				<ParamsManager />
			</Flex>
		</Flex>
	)
}

export default CategoriesPage

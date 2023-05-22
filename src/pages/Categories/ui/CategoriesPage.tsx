// #FIXME: Дерево сворачивается при добовлении параметра
// #FIXME: после создания категории она не сразу попадает в лист категорий доступных быть родителем новой категории.
// #FIXME: ТЕ я создал категорию один, создаю новую категорию но категории один нет среди доступных родителей
import { useCategories } from "Entity/Categories/hooks/useCategories"
import { useCategoriesTree } from "Entity/CategoriesTree/hooks/useCategoriesTree"
import {
	addCategory,
	getCategoriesTree,
	updateCategory,
} from "Entity/CategoriesTree/store/CategoriesTree"
import { RenderCategory } from "Entity/CategoriesTree/ui/RenderCategory"
import { ParamsManager } from "Entity/Params/ui/ParamsManager/ParamsManager"

import { useCategoriesPageLoading } from "../hooks/categories"

import {
	Box,
	Button,
	Flex,
	Skeleton,
	Table,
	TableContainer,
	Tbody,
	Thead,
	Tr,
	VStack,
	useDisclosure,
} from "@chakra-ui/react"
import { type Category } from "Shared/types"
import { CategoryTamplate, IForm } from "Shared/ui/CategoryTamplate/index"
import { Pending } from "Shared/ui/Pending/Pending"
import { TH } from "Shared/ui/TD"
import { useStore } from "effector-react"
import { RemoveCategory } from "features/removeCategory/ui/removeCategory"
import { useState, type FC } from "react"
import { useTranslation } from "react-i18next"
import { v4 } from "uuid"

const CategoriesPage: FC = () => {
	const isPending = useCategoriesPageLoading()
	const create = useDisclosure()
	const remove = useDisclosure()

	const categoriesTree = useCategoriesTree()
	const categories = useCategories()
	const isLoading = useStore(getCategoriesTree.pending)

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
			? updateCategory({
				name,
				parentCategoryId,
				categoryId: category.id,
				linkedFeatures: category.features?.length
					? category.features?.map(el => el.id as number)
					: [],
			})
			: addCategory({ name, parentCategoryId, features: [] })
	}

	const handlerCloseModal = () => {
		setCategory(undefined)
		create.onClose()
	}

	const { t, i18n } = useTranslation()

	return (
		<>
			{isPending ? <Pending /> : null}
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
						actionName={category ? "Изменить" : "Создать"}
						isOpen={create.isOpen}
						onClose={handlerCloseModal}
						category={category}
					/>
				) : null}
				<Box>
					<Button colorScheme="facebook" onClick={create.onOpen}>
						{t("создатьКатегорию")}
					</Button>
				</Box>
				<Flex gap={3} flexGrow={"1"}>
					{!isLoading ? (
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
					) : (
						<VStack gap={5} mt={3} flexGrow={1}>
							<Skeleton w={"full"}>Header</Skeleton>
							{new Array(10).fill("").map(el => (
								<Skeleton key={v4()} w={"full"} h={39}>
                  Row
								</Skeleton>
							))}
						</VStack>
					)}
					<ParamsManager />
				</Flex>
			</Flex>
		</>
	)
}

export default CategoriesPage

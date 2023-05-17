import { ICreateNewItem, paramsWithValueType } from "../type/ProductTamplate"

import {
	HStack,
	Modal as ChakraModal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	Flex,
	ModalFooter,
	ModalCloseButton,
	Stack,
	Heading,
	Button,
	Spacer,
	FormControl,
	Text,
	Input,
	Textarea,
	Select,
	VStack,
	useDisclosure,
	chakra,
	Th,
	Td,
} from "@chakra-ui/react"
import { type CreateProductCommand } from "Shared/types"
import { Counter } from "Shared/ui/CategoryTamplate/ui/Counter"
import { useCounter } from "Shared/utils/useCounter"
import { useEffect, memo, useState, MouseEvent } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useProducts } from "Entity/Products/hooks/useProducts"

export const ProductTamplate = memo(
	({
		onSubmit,
		categories,
		params,
		setCategoryId,
	}: ICreateNewItem) => {
		const { increment, count, decrement } = useCounter()

		const { handleSubmit, register, watch, setValue } =
      useForm<Required<CreateProductCommand>>()

		const categoryId = watch("categoryId")

		const [paramsWithValue, setParamsWithValue] = useState<Array<paramsWithValueType>>(params.map(p => ({id:p.id, name:p.name, value:""})))

		useEffect(() => {
			setCategoryId(categoryId as number)
		}, [categoryId])

		useEffect(() => {
			setParamsWithValue(params.map(p => ({id:p.id, name:p.name, value:""})))
		}, [params])

		useEffect(() => {
			setValue("count", count)
		}, [count])

		const handlerSubmit = (values: Required<CreateProductCommand>) => {
			onSubmit(values)
			onClose()
		}

		const [productIdToRemove, SetProductIdToRemove] = useState<number | null>(
			null
		)
	
		const nav = useNavigate()
	
		const handlerBackClick = () => {
			nav(-1)
		}
	
		const remove = useDisclosure()
	
		const edit = useDisclosure()
	
		const { products, isLoading } = useProducts()
	
		const handlerRemove = (e: MouseEvent<HTMLButtonElement>, id: number) => {
			e.stopPropagation()
			SetProductIdToRemove(id)
			remove.onOpen()
		}
	
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
	
		const handlerProductClick = (id: number) => {
			nav(`/product/${id}`)
		}
	
		const {isOpen, onClose, onOpen} = useDisclosure()

		return (
			<ChakraModal isOpen={isOpen} onClose={onClose} size={"5xl"}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<ModalCloseButton onClick={onClose} />
						<Heading>Создать продукт</Heading>
					</ModalHeader>
					<form onSubmit={handleSubmit(handlerSubmit)}>
						<FormControl>
							<ModalBody>
								<Flex>
									<Stack>
										<Text>Параметры</Text>
										<VStack>
											{paramsWithValue.map(param => (
												<Flex key={param.id} align="center" gap={3}>
													<Text>{param.name}</Text>
													<Input />
												</Flex>
											))}
										</VStack>
										<Spacer />
										<Counter
											count={count}
											onDecrement={decrement}
											onIncrement={increment}
										/>
									</Stack>
									<Spacer />
									<Stack>
										<Flex align={"center"} gap={2}>
											<Text>Наименование</Text>
											<Spacer />
											<Input width="auto" {...register("name")} />
											<Spacer />
										</Flex>
										<Flex align={"center"} gap={2}>
											<Text>Категория</Text>
											<Spacer />
											<Select {...register("categoryId")}>
												{categories.map(category => (
													<option key={category.id} value={category.id}>
														{category.name}
													</option>
												))}
											</Select>
											<Spacer />
										</Flex>
										<Flex align={"center"}>
											<Text>Цена</Text>
											<Spacer />
											<Input width="auto" {...register("price")} />
											<Spacer />
										</Flex>
                    useCategories
										<Flex gap={2} align={"center"}>
											<Text>Описание</Text>
											<Spacer />
											<Textarea {...register("info")} />
											<Spacer />
										</Flex>
									</Stack>
								</Flex>
							</ModalBody>
							<ModalFooter>
								<HStack>
									<Button colorScheme={"red"} onClick={onClose}>
                    Отмена
									</Button>
									<Button colorScheme={"blue"} type={"submit"}>
                    Создать
									</Button>
								</HStack>
							</ModalFooter>
						</FormControl>
					</form>
				</ModalContent>
        CreateNewItem
			</ChakraModal>
		)
	}
)

ProductTamplate.displayName = "ProductTamplate"

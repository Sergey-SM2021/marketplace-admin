import { useCategories } from "Entity/Categories/hooks/useCategories"
import {
	$paramsByCategory,
	getParamsByCategory,
} from "Entity/Params/store/paramsByCategory"
import { paramsWithValueType } from "Entity/Products/ui/ProductTamplate/type/ProductTamplate"

import { Flex, Spacer } from "@chakra-ui/react"
import {
	HStack,
	Modal as ChakraModal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	Stack,
	Heading,
	Button,
	FormControl,
	Text,
	Input,
	Textarea,
	Select,
	VStack,
} from "@chakra-ui/react"
import { CreateProductCommand, Product } from "Shared/types"
import { Counter } from "Shared/ui/CategoryTamplate/ui/Counter"
import { useCounter } from "Shared/utils/useCounter"
import { useStore } from "effector-react"
import { useEffect, memo, useState, FormEvent } from "react"
import { useForm } from "react-hook-form"

interface CreateProductProps {
  onSubmit: (value: CreateProductCommand) => void
  action: string
  isOpen: boolean
  onClose: () => void
  product?: Product
}

type CreateProductFormType = Required<CreateProductCommand>

export const CreateProduct = memo(
	({ onSubmit, isOpen, onClose, action, product }: CreateProductProps) => {
		// form'a типа props для submit'a
		const { handleSubmit, register, watch, setValue, reset} =
      useForm<CreateProductFormType>({
      	defaultValues: {
      		name: product?.name
      	},
      })

	  useEffect(()=>{
			reset({name:product?.name})
	  },[product, reset])

		const categoryId = watch("categoryId")

		const { increment, count, decrement } = useCounter()

		useEffect(() => {
			setValue("count", count)
		}, [count])

		// запрос за новыми параметрами при смене categoryId
		useEffect(() => {
			if (categoryId) {
				getParamsByCategory(categoryId)
			}
		}, [categoryId])

		const params = useStore($paramsByCategory)

		const [paramsWithValue, setParamsWithValue] = useState<
      Array<paramsWithValueType>
    >(params.map(p => ({ id: p.id, name: p.name as string, value: "" })))

		useEffect(() => {
			setParamsWithValue(
				params.map(p => ({ id: p.id, name: p.name as string, value: "" }))
			)
		}, [params])

		const handlerSubmit = (value: CreateProductFormType) => {
			onSubmit({
				...value,
				featureValue: paramsWithValue.map(({ id, value }) => ({ id, value })),
			})
			onClose()
		}

		const handlerChangeParamField = (
			paramId: number,
			e: FormEvent<HTMLInputElement>
		) => {
			const index = paramsWithValue.findIndex(el => el.id === paramId)
			setParamsWithValue(prev =>
				prev.map((el, i) =>
					i === index ? { ...el, value: e.target.value } : el
				)
			)
		}

		// получаем категории для selecta
		const categories = useCategories()

		return (
			<ChakraModal isOpen={isOpen} onClose={onClose} size={"5xl"}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<ModalCloseButton onClick={onClose} />
						<Heading>{action} продукт</Heading>
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
													<Input
														value={
															paramsWithValue.find(el => el.id === param.id)
																?.value
														}
														onChange={e => {
															handlerChangeParamField(param.id, e)
														}}
													/>
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
										{action} продукт
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

CreateProduct.displayName = "CreateProduct"

import { useCategories } from "Entity/Categories/hooks/useCategories"
import {
	$paramsByCategory,
	getParamsByCategory,
} from "Entity/Params/store/paramsByCategory"
import { createProduct } from "Entity/Products/model/model"
import {
	paramsWithValueType,
	SubmitedValue,
} from "Entity/Products/ui/ProductTamplate/type/ProductTamplate"

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
import { CreateProductCommand } from "Shared/types"
import { Counter } from "Shared/ui/CategoryTamplate/ui/Counter"
import { useCounter } from "Shared/utils/useCounter"
import { useStore } from "effector-react"
import { useEffect, memo, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

interface CreateProductProps {
  onSubmit?: () => void
  title?: string
  buttontText?: string
  isOpen: boolean
  onClose: () => void
}

export const CreateProduct = memo(
	({ buttontText, onSubmit, title, isOpen, onClose }: CreateProductProps) => {
		const categories = useCategories()
		const params = useStore($paramsByCategory)
		const { handleSubmit, register, watch, setValue } =
      useForm<Required<CreateProductCommand>>()

		const categoryId = watch("categoryId")

		useEffect(() => {
			if (categoryId) {
				getParamsByCategory(categoryId)
			}
		}, [categoryId])

		const handlerSubmit = (value: SubmitedValue) => {
			createProduct({ ...value, featureValue: [{ id: 9, value: "jk" }] })
			onClose()
		}

		const { increment, count, decrement } = useCounter()

		const [paramsWithValue, setParamsWithValue] = useState<
      Array<paramsWithValueType>
    >(params.map(p => ({ id: p.id, name: p.name, value: "" })))

		useEffect(() => {
			setParamsWithValue(
				params.map(p => ({ id: p.id, name: p.name, value: "" }))
			)
		}, [params])

		useEffect(() => {
			setValue("count", count)
		}, [count])

		const [productIdToRemove, SetProductIdToRemove] = useState<number | null>(
			null
		)

		const nav = useNavigate()


		return (<ChakraModal isOpen={isOpen} onClose={onClose} size={"5xl"}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<ModalCloseButton onClick={onClose} />
					<Heading>Создать продукт</Heading>
				</ModalHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
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

CreateProduct.displayName = "CreateProduct"

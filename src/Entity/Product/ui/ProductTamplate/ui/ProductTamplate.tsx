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
} from "@chakra-ui/react"
import { type CreateProductCommand } from "Shared/types"
import { Counter } from "Shared/ui/CategoryTamplate/ui/Counter"
import { useCounter } from "Shared/utils/useCounter"
import { useEffect, memo, useState } from "react"
import { useForm } from "react-hook-form"

export const ProductTamplate = memo(
	({
		onClose,
		isOpen,
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

		return (
			<ChakraModal isOpen={isOpen} onClose={onClose} size={"5xl"}>
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

ProductTamplate.displayName = "ProductTamplate"

import { useCategories } from "Entity/Categories/hooks/useCategories"
import { ParamsListByCategoryId } from "Entity/Params/ui/ParamsByCategory/ParamsByCategory"

import { ICreateNewItem } from "../type/ProductTamplate"

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
	useCounter,
} from "@chakra-ui/react"
import { DevTool } from "@hookform/devtools"
import { type CreateProductCommand } from "Shared/types"
import { Counter } from "Shared/ui/CategoryTamplate/ui/Counter"
import { type FC, useRef } from "react"
import { useForm } from "react-hook-form"

export const ProductTamplate: FC<ICreateNewItem> = ({
	onClose,
	isOpen,
	onSubmit,
}) => {
	const categories = useCategories()

	const { value } = useCounter()

	const { control, handleSubmit, register, watch } =
    useForm<CreateProductCommand>()

	const categoryId = watch("categoryId")

	const featureValue = useRef(null)

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
									<ParamsListByCategoryId
										featureValue={featureValue}
										categoryId={categoryId ?? 51}
									/>
									<Spacer />
									<Counter count={value} />
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
                  Сохранить
								</Button>
							</HStack>
						</ModalFooter>
					</FormControl>
				</form>
			</ModalContent>
      CreateNewItem
			<DevTool control={control} />
		</ChakraModal>
	)
}

import { CategoryTamplateProps, IForm } from "../types/CategoryTamplate"

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	HStack,
	Input,
	FormControl,
	Flex,
	VStack,
	Select,
	FormLabel,
	FormErrorMessage,
	ModalCloseButton,
} from "@chakra-ui/react"
import { type FC } from "react"
import { useForm } from "react-hook-form"

export const CategoryTamplate: FC<CategoryTamplateProps> = ({
	onClose,
	isOpen,
	submitHandler,
	category,
	categories,
	actionName
}) => {
	const { register, handleSubmit } = useForm<IForm>({
		defaultValues: {
			name: category?.name ?? "",
			parentCategoryId: category?.parentCategoryId ?? 0,
		},
	})

	const onSubmit = (values: IForm) => {
		submitHandler(values)
		onClose()
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{actionName} категорию</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl>
						<ModalBody>
							<VStack align={"normal"}>
								<Flex direction={"column"}>
									<FormLabel>Название категории</FormLabel>
									<Input {...register("name")} />
									<FormErrorMessage>not valid field</FormErrorMessage>
								</Flex>
								<Flex direction={"column"}>
									<FormLabel>Родительская категория</FormLabel>
									<Select {...register("parentCategoryId")}>
										<option value={undefined}></option>
										{categories.map(cat => (
											<option value={cat.id} key={cat.id}>
												{cat.name}
											</option>
										))}
									</Select>
									<FormErrorMessage>not valid field</FormErrorMessage>
								</Flex>
							</VStack>
						</ModalBody>
						<ModalFooter>
							<HStack>
								<Button colorScheme="red" onClick={onClose}>
                  Отмена
								</Button>
								<Button colorScheme="blue" type="submit" isDisabled={false}>
									{actionName}
								</Button>
							</HStack>
						</ModalFooter>
					</FormControl>
				</form>
			</ModalContent>
		</Modal>
	)
}

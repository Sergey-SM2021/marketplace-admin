import { useCategories } from "Entity/Categories/hooks/useCategories"
import { updateCategory, addCategory } from "Entity/CategoriesTree/store/store"
import { $params } from "Entity/Params/store/params"
import { getParamsByCategory } from "Entity/Params/store/paramsByCategory"

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
	Tag,
	FormLabel,
	TagCloseButton,
	FormErrorMessage,
	TagLabel,
	ModalCloseButton,
} from "@chakra-ui/react"
import { type Category, type CreateCategoryCommand } from "Shared/types"
import { useStore } from "effector-react"
import { type FC, useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"

interface IForm extends Omit<CreateCategoryCommand, "features"> {
  features: Array<{ id: number; value: string }>
  param: string
}

interface ICategoryModal {
  isOpen: boolean
  onClose: () => void
  title: string
  method: "POST" | "PUT"
  category?: Category | null
}

export const EditCategory: FC<ICategoryModal> = ({
	onClose,
	title,
	isOpen,
	method,
	category,
}) => {
	const params = useStore($params)

	const categories = useCategories()

	const { register, control, handleSubmit, watch, getValues, setValue } =
    useForm<IForm>({
    	defaultValues: {
    		name: category?.name,
    		features: category?.features?.map(el => ({
    			id: el.id,
    			value: el.name,
    		})),
    		parentCategoryId: category?.parentCategoryId,
    	},
    })

	const parentCategoryIdWatcher = watch("parentCategoryId")

	const { fields, append, remove } = useFieldArray({
		control,
		name: "features",
	})

	useEffect(() => {
		getParamsByCategory(parentCategoryIdWatcher as number)
	}, [parentCategoryIdWatcher])

	const onSubmit = (values: IForm) => {
		if (method === "POST") {
			addCategory({ ...values, features: values.features.map(f => f.value) })
		} else {
			updateCategory({ ...values })
		}
		onClose()
	}

	const addParam = () => {
		const value = getValues()
		if (value.param.length) {
			setValue("param", "")
			append({ value: value.param, id: Math.random() })
		}
	}

	const handlerRemoveParam = (id: number) => {
		remove(fields.findIndex(el => el.id === id))
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
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
											<option value={cat.id}>{cat.name}</option>
										))}
									</Select>
									<FormErrorMessage>not valid field</FormErrorMessage>
								</Flex>
								<Flex direction={"column"}>
									<FormLabel>Параметры</FormLabel>
									<HStack>
										<Input {...register("param")} />
										<Button onClick={addParam}>Добавить</Button>
									</HStack>
									{params.length || fields.length ? (
										<Flex pt={5} gap={3}>
											{params.map(param => (
												<Tag key={param.id}>{param.name}</Tag>
											))}
											{fields.map(field => (
												<Tag colorScheme="green" key={field.id}>
													<TagLabel>{field.value}</TagLabel>
													<TagCloseButton
														onClick={() => {
															handlerRemoveParam(field.id)
														}}
													/>
												</Tag>
											))}
										</Flex>
									) : null}
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
                  Создать
								</Button>
							</HStack>
						</ModalFooter>
					</FormControl>
				</form>
			</ModalContent>
		</Modal>
	)
}

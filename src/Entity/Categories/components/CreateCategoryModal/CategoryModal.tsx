import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody, Button, HStack, Input, FormControl, Flex, VStack, Select, Tag
} from '@chakra-ui/react'
import {FC, useEffect} from "react";
import {FormLabel, TagCloseButton, FormErrorMessage, TagLabel, ModalCloseButton} from '@chakra-ui/react'
import {useFieldArray, useForm} from "react-hook-form";
import {Category, CreateCategoryCommand, Feature} from "types";
import {addCategory} from "../../store/store";

interface ICategoryModal {
    addCategory: (category: CreateCategoryCommand) => void
    isOpen: boolean
    onClose: () => void
    categories: Category[]
    getCurrentParams: (id: number) => void
    params: Feature[]
}

interface IForm extends Omit<CreateCategoryCommand, "features"> {
    features: Array<{ id: number, value: string }>
    param: string
}

export const CategoryModal: FC<ICategoryModal> = ({onClose, isOpen, params, categories, getCurrentParams}) => {
    const {register, control, handleSubmit, watch, getValues, setValue} = useForm<IForm>()
    const parentCategoryIdWatcher = watch("parentCategoryId")
    const {fields, append, remove} = useFieldArray({control, name: "features"})
    useEffect(() => {
        getCurrentParams(parentCategoryIdWatcher as number)
    }, [parentCategoryIdWatcher])
    const onSubmit = (values: IForm) => {
        addCategory({...values, features: values.features.map(f => f.value)})
        onClose()
    }
    const addParam = () => {
        const value = getValues()
        if (value.param.length) {
            setValue("param", "")
            append({value: value.param, id: Math.random()})
        }
    }
    const handlerRemoveParam = (id: number) => {
        remove(fields.findIndex(el => el.id === id))
    }
    return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Создать новую категорию</ModalHeader>
            <ModalCloseButton/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <ModalBody>
                        <VStack align={"normal"}>
                            <Flex direction={'column'}>
                                <FormLabel>Название категории</FormLabel>
                                <Input {...register('name')}/>
                                <FormErrorMessage>not valid field</FormErrorMessage>
                            </Flex>
                            <Flex direction={'column'}>
                                <FormLabel>Родительская категория</FormLabel>
                                <Select {...register("parentCategoryId")}>
                                    <option value={undefined}></option>
                                    {categories.map(cat => <option value={cat.id}>{cat.name}</option>)}
                                </Select>
                                <FormErrorMessage>not valid field</FormErrorMessage>
                            </Flex>
                            <Flex direction={'column'}>
                                <FormLabel>Параметры</FormLabel>
                                <HStack>
                                    <Input {...register('param')}/>
                                    <Button onClick={addParam}>Добавить</Button>
                                </HStack>
                                <HStack>
                                    {params.map(param => <Tag key={param.id}>{param.name}</Tag>)}
                                    {fields.map(field => <Tag colorScheme='green' key={field.id}>
                                        <TagLabel>{field.value}</TagLabel>
                                        <TagCloseButton onClick={() => {
                                            handlerRemoveParam(field.id)
                                        }}/>
                                    </Tag>)}
                                </HStack>
                                <FormErrorMessage>not valid field</FormErrorMessage>
                            </Flex>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <HStack>
                            <Button colorScheme='red' onClick={onClose}>Отмена</Button>
                            <Button colorScheme='blue' type="submit" isDisabled={false}>Создать</Button>
                        </HStack>
                    </ModalFooter>
                </FormControl>
            </form>
        </ModalContent>
    </Modal>
}

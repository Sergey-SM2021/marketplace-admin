import {type FC} from 'react'
import {
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody, Flex,
    ModalFooter,
    ModalCloseButton, Stack,
    Heading, Button, Spacer, FormControl, Text, Input, Textarea, Select
} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {Category, CreateProductCommand} from "../../../types";

interface ICreateNewItem {
    isOpen: boolean
    onClose: () => void
    categories: Category[]
}

interface IFrom extends CreateProductCommand {

}

export const CreateNewItem: FC<ICreateNewItem> = ({onClose, isOpen, categories}) => {
    const {
        control, handleSubmit, register
    }
        = useForm<CreateProductCommand>()
    const onSubmit = (value: IFrom) => {
        alert(JSON.stringify(value))
    }
    return <Modal isOpen={isOpen} onClose={onClose} size={'5xl'}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
                <ModalCloseButton onClick={onClose}/>
                <Heading>Создать продукт</Heading>
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <ModalBody>
                        <Flex>
                            <Stack>
                                <Text>Параметры</Text>
                                <HStack>
                                    <Text>Бренд</Text>
                                    <Input width='auto'/>
                                </HStack>
                                <HStack>
                                    <Text>Цвет</Text>
                                    <Input width='auto'/>
                                </HStack>
                                <Spacer/>
                                <HStack>
                                    <Text>Количество</Text>
                                    <Input width='auto' htmlSize={2}/>
                                    <Button colorScheme={"red"}>+</Button>
                                    <Button colorScheme={"blue"}>-</Button>
                                </HStack>
                            </Stack>
                            <Spacer/>
                            <Stack>
                                <Flex align={'center'} gap={2}>
                                    <Text>Наименование</Text>
                                    <Spacer/>
                                    <Input width='auto' {...register("name")}/>
                                    <Spacer/>
                                    <Button colorScheme='teal'
                                    >edit</Button>
                                </Flex>
                                <Flex align={'center'} gap={2}>
                                    <Text>Категория</Text>
                                    <Spacer/>
                                    <Select>
                                        <option>1</option>
                                        <option>2</option>
                                    </Select>
                                    <Spacer/>
                                    <Button colorScheme='teal'
                                    >edit</Button>
                                </Flex>
                                <Flex align={'center'}>
                                    <Text>Цена</Text>
                                    <Spacer/>
                                    <Input width='auto' {...register("price")}/>
                                    <Spacer/>
                                    <Button colorScheme='teal'
                                    >edit</Button>
                                </Flex>
                                <Flex gap={2} align={'center'}>
                                    <Text>Описание</Text>
                                    <Spacer/>
                                    <Textarea {...register("info")}/>
                                    <Spacer/>
                                    <Button colorScheme='teal'
                                    >edit</Button>
                                </Flex>
                            </Stack>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <HStack>
                            <Button colorScheme={"red"}>Отмена</Button>
                            <Button colorScheme={"blue"} type={"submit"}>Сохранить</Button>
                        </HStack>
                    </ModalFooter>
                </FormControl>
            </form>
        </ModalContent>
        CreateNewItem
    </Modal>
}

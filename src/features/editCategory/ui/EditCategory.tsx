import { type CreateCategoryCommand } from "types"

import { addCategory } from "Entity/Categories/store/store"

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
import { useCategories } from "hooks/hooks"
import { type FC, useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { $params, getParams } from "Entity/Params/store/store"
import { useStore } from "effector-react"

interface ICategoryModal {
  isOpen: boolean
  onClose: () => void
}

interface IForm extends Omit<CreateCategoryCommand, "features"> {
  features: Array<{ id: number; value: string }>
  param: string
}

export const EditCategory: FC<ICategoryModal> = ({
  onClose,
  isOpen,
}) => {
  const categories = useCategories()

  const { register, control, handleSubmit, watch, getValues, setValue } =
    useForm<IForm>()

  const parentCategoryIdWatcher = watch("parentCategoryId")

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  })

  useEffect(() => {
    getParams(parentCategoryIdWatcher as number)
  }, [parentCategoryIdWatcher])

  const onSubmit = (values: IForm) => {
    addCategory({ ...values, features: values.features.map(f => f.value) })
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
  
  const params = useStore($params)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Создать новую категорию</ModalHeader>
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
                  <HStack>
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
                  </HStack>
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

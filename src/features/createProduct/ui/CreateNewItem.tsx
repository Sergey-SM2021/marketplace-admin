import { type CreateProductCommand } from "types"

import { ParamsListByCategoryId } from "Entity/Params/ui/ParamsList/ParamsList"
import { product } from "Entity/Products"

import { useCategories } from "../../../hooks/hooks"

import {
  HStack,
  Modal,
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
} from "@chakra-ui/react"
import { DevTool } from "@hookform/devtools"
import { type FC } from "react"
import { useForm } from "react-hook-form"

interface ICreateNewItem {
  isOpen: boolean
  onClose: () => void
}

export interface SubmitedValue
  extends Omit<Record<keyof CreateProductCommand, string>, "featureValue"> {
  featureValue: CreateProductCommand["featureValue"]
}

export const CreateNewItem: FC<ICreateNewItem> = ({ onClose, isOpen }) => {
  const categories = useCategories()

  const { control, handleSubmit, register, watch } =
    useForm<CreateProductCommand>({ defaultValues: { count: 1 } })

  const categoryId = watch("categoryId")

  const onSubmit = (value: SubmitedValue) => {
    product.model.createProduct({
      ...value,
      count: Number(value.count),
      categoryId: Number(value.categoryId),
      price: Number(value.categoryId),
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
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
                    register={register}
                    categoryId={categoryId ?? 51}
                    name={"featureValue"}
                  />
                  <Spacer />
                  <HStack>
                    <Text>Количество</Text>
                    <Input width="auto" htmlSize={2} {...register("count")} />
                    <Button colorScheme={"red"}>+</Button>
                    <Button colorScheme={"blue"}>-</Button>
                  </HStack>
                </Stack>
                <Spacer />
                <Stack>
                  <Flex align={"center"} gap={2}>
                    <Text>Наименование</Text>
                    <Spacer />
                    <Input width="auto" {...register("name")} />
                    <Spacer />
                    <Button colorScheme="teal">edit</Button>
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
                    <Button colorScheme="teal">edit</Button>
                  </Flex>
                  <Flex align={"center"}>
                    <Text>Цена</Text>
                    <Spacer />
                    <Input width="auto" {...register("price")} />
                    <Spacer />
                    <Button colorScheme="teal">edit</Button>
                  </Flex>
                  <Flex gap={2} align={"center"}>
                    <Text>Описание</Text>
                    <Spacer />
                    <Textarea {...register("info")} />
                    <Spacer />
                    <Button colorScheme="teal">edit</Button>
                  </Flex>
                </Stack>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Button colorScheme={"red"}>Отмена</Button>
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
    </Modal>
  )
}

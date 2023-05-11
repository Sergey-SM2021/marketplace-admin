import { type CreateProductCommand } from "types"

import { useCategories } from "Entity/Categories/hooks/useCategories"
import { ParamsListByCategoryId } from "Entity/Params/ui/ParamsByCategory/ParamsByCategory"

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
} from "@chakra-ui/react"
import { DevTool } from "@hookform/devtools"
import { type FC, useRef } from "react"
import { useForm } from "react-hook-form"

interface ICreateNewItem {
  isOpen: boolean
  onClose: () => void
  action: "create" | "edit"
}

export interface SubmitedValue
  extends Omit<Record<keyof CreateProductCommand, string>, "featureValue"> {
  featureValue: any
}

export const Modal: FC<ICreateNewItem> = ({ onClose, isOpen, action }) => {
  const categories = useCategories()

  const { control, handleSubmit, register, watch } =
    useForm<CreateProductCommand>({ defaultValues: { count: 1 } })

  const categoryId = watch("categoryId")

  const featureValue = useRef(null)

  const onSubmit = (value: SubmitedValue) => {
    // product.model.createProduct({
    //   ...value,
    //   count: Number(value.count),
    //   categoryId: Number(value.categoryId),
    //   price: Number(value.categoryId),
    // })
    // #TODO: if action === "create" ? post : put
    console.log(featureValue)
  }

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
    </ChakraModal>
  )
}

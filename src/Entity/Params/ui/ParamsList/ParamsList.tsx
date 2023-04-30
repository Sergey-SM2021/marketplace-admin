import { $params, getParams } from "../../store/store"

import { HStack, Input, Text } from "@chakra-ui/react"
import { useStore } from "effector-react"
import { useEffect } from "react"

interface IParamsListByCategoryId {
  categoryId: number
  name: string
  register: any
}

export const ParamsListByCategoryId = ({
  categoryId,
  name,
  register,
}: IParamsListByCategoryId) => {
  const params = useStore($params)
  useEffect(() => {
    getParams(categoryId)
  }, [categoryId])
  return (
    <>
      {params.map((param, index) => (
        <HStack key={param.id}>
          <Text>{param.name}</Text>
          <Input {...register(`${name}.${param.name}`)} />
        </HStack>
      ))}
    </>
  )
}

import { $params, getParams } from "../../store/store"

import { HStack, Input, Text } from "@chakra-ui/react"
import { useStore } from "effector-react"
import { type FormEvent, useEffect } from "react"

interface IParamsListByCategoryId {
  categoryId: number
  featureValue: any
}

export const ParamsListByCategoryId = ({
  categoryId,
  featureValue,
}: IParamsListByCategoryId) => {
  const params = useStore($params)

  useEffect(() => {
    getParams(categoryId)
  }, [categoryId])

  const handlerChange = (e: FormEvent<HTMLInputElement>) => {
    featureValue.current = {...featureValue.current, 3:"lsdkcdm"}
  }

  return (
    <>
      {params.map(param => (
        <HStack key={param.id}>
          <Text>{param.name}</Text>
          <Input
            value={featureValue[3]}
            onChange={handlerChange}
          />
        </HStack>
      ))}
    </>
  )
}

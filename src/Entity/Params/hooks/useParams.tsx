import { $params, getParams } from "../store/store"

import { useStore } from "effector-react"
import { useEffect } from "react"

export const useParams = (params: number) => {
  useEffect(() => {
    getParams(params)
  }, [])

  return useStore($params)
}

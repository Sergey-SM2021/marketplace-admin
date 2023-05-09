import { $params, getParams, getParamsByCategory } from "../store/store"

import { useStore } from "effector-react"
import { useEffect } from "react"

export const useParams = () => {
  useEffect(() => {
    getParams()
  }, [])

  return useStore($params)
}

export const useParamsByCategory = (params: number) => {
  useEffect(() => {
    getParamsByCategory(params)
  }, [])

  return useStore($params)
}

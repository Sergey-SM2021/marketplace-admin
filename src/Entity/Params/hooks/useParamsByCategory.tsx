import { $params } from "../store/params"
import { getParamsByCategory } from "../store/paramsByCategory"

import { useStore } from "effector-react"
import { useEffect } from "react"

export const useParamsByCategory = (params?: number) => {
	useEffect(() => {
		if (params) {
			getParamsByCategory(params)
		}
	}, [params])

	return params ? useStore($params) : []
}

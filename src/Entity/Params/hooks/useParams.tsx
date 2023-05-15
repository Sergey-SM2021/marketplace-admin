import { $params, getParams } from "../store/params"

import { useStore } from "effector-react"
import { useEffect } from "react"

export const useParams = () => {
	useEffect(() => {
		getParams()
	}, [])

	return useStore($params)
}

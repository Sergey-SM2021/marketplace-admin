import * as api from "../api/api"

import { type Feature } from "Shared/types"
import { createDomain } from "effector"

const ParamsByCategory = createDomain()

export const getParamsByCategory = ParamsByCategory.createEffect(
	api.getParamsByCategory
)

export const $paramsByCategory = ParamsByCategory.createStore<
  Required<Feature>[]
>([]).on(getParamsByCategory.doneData, (state, payload) => {
	return payload
})

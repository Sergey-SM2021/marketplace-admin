import { type Feature } from "types"

import * as api from "../api/api"

import { createDomain } from "effector"

const ParamsByCategory = createDomain()

export const getParamsByCategory = ParamsByCategory.createEffect(
  api.getParamsByCategory
)

export const $paramsByCategory = ParamsByCategory.createStore<Feature[]>([]).on(
  getParamsByCategory.doneData,
  (state, payload) => {
    return payload
  }
)

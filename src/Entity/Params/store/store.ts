import { type Feature } from "types"

import * as api from "../api/api"

import { createDomain } from "effector"

const paramsDomain = createDomain()

export const getParamsByCategory = paramsDomain.createEffect(
  api.getParamsByCategory
)

export const $paramsByCategory = paramsDomain
  .createStore<Feature[]>([])
  .on(getParamsByCategory.doneData, (state, payload) => {
    return payload
  })

export const getParams = paramsDomain.createEffect(api.getParams)

export const filterParams = paramsDomain.createEvent()

export const $params = paramsDomain
  .createStore<Feature[]>([])
  .on(getParams.doneData, (state, payload) => {
    return payload
  })

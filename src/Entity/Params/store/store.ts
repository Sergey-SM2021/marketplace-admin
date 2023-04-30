import { type Feature } from "types"

import * as api from "../api/api"

import { createDomain } from "effector"

const paramsDomain = createDomain()

export const getParams = paramsDomain.createEffect(api.getParamsByCategory)

export const $params = paramsDomain
  .createStore<Feature[]>([])
  .on(getParams.doneData, (state, payload) => {
    console.log(payload)
    return payload
  })

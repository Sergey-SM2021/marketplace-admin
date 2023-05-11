import { type Feature } from "Shared/types"

import * as api from "../api/api"

import { createDomain } from "effector"

const params = createDomain()

export const getParams = params.createEffect(api.getParams)

export const createParam = params.createEffect(api.createParam)

export const filterParams = params.createEvent<Feature>()

export const $params = params
  .createStore<Feature[]>([])
  .on(filterParams, (state, payload) =>
    state.filter(el => el.id !== payload.id)
  )
  .on(getParams.doneData, (state, payload) => payload)

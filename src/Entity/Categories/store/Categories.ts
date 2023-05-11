import { type CategoryResponseDTO } from "types/models/CategoryResponseDTO"

import * as api from "../api/Categories"

import { createDomain } from "effector"

const categoriesDomain = createDomain()

export const getCategories = categoriesDomain.createEffect<
  void,
  CategoryResponseDTO[]
>(api.getCategories)

export const $categories = categoriesDomain
  .createStore<CategoryResponseDTO[]>([])
  .on(getCategories.doneData, (_, payload) => payload)
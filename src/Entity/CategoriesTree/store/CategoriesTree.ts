import * as api from "../api"
import { removeNestedCat } from "../utils"
import { addNestedCat } from "../utils/addNestedCat/addNestedCat"
import { halper } from "../utils/addParamsRecursive/addParamsRecursive"
import { updateCategoryHandler } from "../utils/updateCategoryHandler/updateCategoryHandler"
import { ISetParamToCategory } from "./types/types"

import "@total-typescript/ts-reset"
import {
	type CategoryResponse,
	type Category,
	type CreateCategoryCommand,
	type CategoryResponseTreeDTO,
	Feature,
	EditCategoryCommand,
} from "Shared/types"
import { attach, createDomain } from "effector"

const categoriesDomain = createDomain()

export const getCategoriesTree = categoriesDomain.createEffect(
	api.getCategoriesTree
)

export const removeCategoryById = categoriesDomain.createEffect<number, string>(
	api.removeCategory
)

export const addCategory = categoriesDomain.createEffect<
  CreateCategoryCommand,
  CategoryResponse
>(api.createCategory)

export const updateCategory = categoriesDomain.createEffect<
  EditCategoryCommand,
  CategoryResponse
>(api.editCategory)

export const SetParamToCategory = categoriesDomain.createEffect<
  ISetParamToCategory,
  ISetParamToCategory
>(({ src, clk }) => {
	return { src, clk }
})

export const addParamToAddInCategory = categoriesDomain.createEvent<Feature>()

export const $categoriesTree = categoriesDomain
	.createStore<CategoryResponseTreeDTO[]>([])

	.on(SetParamToCategory.doneData, (state, props) => {
		const { clk: category, src: feature } = props
		return state.map(el =>
			halper(el, category.id as number, feature as Feature)
		)
	})

	.on(getCategoriesTree.doneData, (state, payload) =>
		payload.map(category => ({ ...category, isOpen: false }))
	)

	.on(removeCategoryById.done, (state, { params }) => {
		if (state.findIndex(el => el.id === params) !== -1) {
			return state.filter(el => el.id !== params)
		}
		return state.map(s => removeNestedCat(s, params))
	})

	.on(addCategory.doneData, (state, payload) => {
		if (payload?.category?.parentCategoryId === null) {
			return [...state, { ...payload.category, childCategories: [] }]
		}
		const result = state.map(el =>
			addNestedCat(el, payload.category as Category)
		)
		return result
	})

	.on(updateCategory.doneData, (state, payload) => {
		return state.map(el => updateCategoryHandler(el, payload.category)).filter(Boolean)
	})

export const $paramToAddInToCategory = categoriesDomain
	.createStore<Feature | null>(null)
	.on(addParamToAddInCategory, (state, payload) => payload)

export const updateCategoryParam = attach({
	source: $paramToAddInToCategory,
	effect: updateCategory,
	mapParams(editCategoryCommand: EditCategoryCommand, param: Feature | null) {
		return {
			categoryId: editCategoryCommand.categoryId,
			linkedFeatures: editCategoryCommand.linkedFeatures?.length
				? [...editCategoryCommand.linkedFeatures, param?.id]
				: [param?.id],
			name: editCategoryCommand.name,
			parentCategoryId: editCategoryCommand.parentCategoryId,
		}
	},
})

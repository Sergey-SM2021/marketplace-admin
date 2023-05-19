import * as api from "../api"
import { removeNestedCat } from "../utils"
import { addNestedCat } from "../utils/addNestedCat/addNestedCat"

import {
	type CategoryResponse,
	type Category,
	type CreateCategoryCommand,
	type CategoryResponseTreeDTO,
	Feature,
} from "Shared/types"
import { type CategoryResponseDTO } from "Shared/types/models/CategoryResponseDTO"
import { createDomain, sample } from "effector"

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

export const getCategories = categoriesDomain.createEffect<
  void,
  CategoryResponseDTO[]
>(api.getCategories)

export const updateCategory = categoriesDomain.createEffect(api.editCategory)

export const removeCategoryParam = categoriesDomain.createEffect<
  number,
  string
>(api.removeCategoryParam)

export const SetParamToCategory = categoriesDomain.createEffect<
  {
    src: Feature | null
    clk: Category
  },
  {
    src: Feature | null
    clk: Category
  }
>(({ src, clk }) => {
	return { src, clk }
})

// принимает (категорию, id категории в которую нужно добавить параметр, параметр, который нужно добавить), возвращает копию категории
const halper = (cat: Category, id: number, param: Feature): Category => {

	if(cat.id === id){
		cat.features = cat.features ? [...cat.features, param] : [param]
	}

	return {
		...cat,
		childCategories: cat.childCategories
			? cat.childCategories.map(el => halper(el, id, param))
			: [],
	}
}

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

	.on(updateCategory.done, (state, { params, result }) => {
		function rec(cat: Category) {
			if (cat.childCategories?.length) {
				cat.childCategories.forEach(element => {
					rec(element)
				})
			}
			return cat.id === result.category?.id
				? {
					...result.category,
					isOpen: false,
					childCategories: result.category?.childCategories,
				}
				: cat
		}

		const res = state.map(el => rec(el))
		return res
	})

// --------------------------------------------------------------------------------

export const addParamToAddInCategory = categoriesDomain.createEvent<Feature>()

export const addParamToTree = categoriesDomain.createEvent<Category>()

export const $paramToAddInToCategory = categoriesDomain
	.createStore<Feature | null>(null)
	.on(addParamToAddInCategory, (state, payload) => payload)

// --------------------------------------------------------------------------------

sample({
	clock: addParamToTree,
	fn(src: Feature | null, clk: Category) {
		return { src, clk }
	},
	source: $paramToAddInToCategory,
	target: SetParamToCategory,
})
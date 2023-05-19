import { Category, Feature } from "Shared/types"

// принимает (категорию, id категории в которую нужно добавить параметр, параметр, который нужно добавить), возвращает копию категории
export const halper = (cat: Category, id: number, param: Feature): Category => {

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
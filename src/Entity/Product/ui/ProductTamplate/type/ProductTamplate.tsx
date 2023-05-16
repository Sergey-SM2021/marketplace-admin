import {
	CategoryResponseDTO,
	CreateProductCommand,
	Feature,
} from "Shared/types"

export interface ICreateNewItem {
  setCategoryId: (categoryId: number) => void
  params: Required<Feature>[]
  isOpen: boolean
  categories: CategoryResponseDTO[]
  onClose: () => void
  onSubmit: (product: SubmitedValue) => void
}

export interface SubmitedValue extends Omit<Required<CreateProductCommand>, "featureValue"> {
  featureValue: paramsWithValueType
}

export interface paramsWithValueType {
  name: string | null
  id: number
  value: string
}

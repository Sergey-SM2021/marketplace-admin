import { Category } from "types"

export interface IForm {
  name: string
  parentCategoryId?: number
}

export interface CategoryTamplateProps {
  isOpen: boolean
  onClose: () => void
  title: string
  submitHandler: (values: IForm) => void
  category?: Category
  categories: Array<Category>
}

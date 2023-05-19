import { Category, EditCategoryCommand } from "Shared/types"

export type IForm = EditCategoryCommand

export interface CategoryTamplateProps {
  isOpen: boolean
  onClose: () => void
  actionName: "Изменить" | "Создать"
  submitHandler: (values: IForm) => void
  category?: Category
  categories: Array<Category>
}

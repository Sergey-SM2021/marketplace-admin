import { CreateProductCommand } from "types"

export interface ICreateNewItem {
  isOpen: boolean
  onClose: () => void
  onSubmit: (product: CreateProductCommand) => void
}

export interface SubmitedValue
  extends Omit<Record<keyof CreateProductCommand, string>, "featureValue"> {
  featureValue: any
}

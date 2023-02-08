import { CreateProductCommand } from "entity"

export interface ICreateProductModal {
    onCreateProduct: (product :CreateProductCommand) => void
}

export interface IForm {
  name: string
  price: number
  rating: number
  info: string
}

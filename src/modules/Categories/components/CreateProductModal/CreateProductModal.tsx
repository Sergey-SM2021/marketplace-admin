import { Button, Field } from "ui"

import { ICreateProductModal, IForm } from "./CreateProductModal.types"

import { FC } from "react"
import { useForm } from "react-hook-form"

export const CreateProductModal: FC<ICreateProductModal> = ({
  onCreateProduct,
}) => {
  const { register, handleSubmit } = useForm<IForm>()
  const onSubmit = async (data: IForm) => {
    onCreateProduct(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 grid-cols-4">
        <h6 className="whitespace-nowrap">product name</h6>
        <Field {...register("name")} className="col-span-3" />
        <div className="grid col-span-4 gap-8 grid-flow-col">
          <div className="grid grid-flow-col items-center gap-2">
            <h6 className="whitespace-nowrap">price</h6>
            <Field {...register("price")} className="col-span-1" />
          </div>

          <div className="grid grid-flow-col items-center gap-2">
            <h6 className="whitespace-nowrap">rating</h6>
            <Field {...register("rating")} className="col-span-1" />
          </div>
        </div>
        <div className="col-span-4">
          <h6 className="whitespace-nowrap">info</h6>
          <textarea className="w-full h-28" {...register("info")} />
        </div>
        <div className="col-span-4 flex justify-end">
          <Button>Добавить продукт</Button>
        </div>
      </div>
    </form>
  )
}

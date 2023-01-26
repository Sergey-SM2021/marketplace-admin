import { Product } from "entity"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { Button } from "ui/Button/Button"
import { Field } from "ui/Field"

interface ICreateNewItem {
  handlerClose: () => void
  handlerCreateProduct: (product: Product) => void
}

type TCreateNewItem = Omit<
  Product,
  "id" | "categoryId" | "category" | "features" | "rating"
>

export const CreateNewItem: FC<ICreateNewItem> = ({
  handlerClose,
  handlerCreateProduct,
}) => {
  const { register, handleSubmit } = useForm<TCreateNewItem>()
  const onSubmit = (data: TCreateNewItem) => {
    handlerCreateProduct(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex-auto">
        <div className="grid gap-4 grid-cols-3">
          <Field title="Название" placeholder="IPhone" {...register("name")} />
          <Field title="Цена" placeholder="130000" {...register("price")} />
          <Field
            title="Описание"
            placeholder="Хорошая вещь..."
            {...register("info")}
          />
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <Button>Добавить</Button>
        <Button isDangerous onClick={handlerClose}>
          Отмена
        </Button>
      </div>
    </form>
  )
}

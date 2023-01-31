import { Category } from "entity"
import { useForm } from "react-hook-form"
import { Field, Button } from "ui"
import { Chips } from "./Chips"
import { FC } from "react"
import { generateId } from "utils/generateId"

interface ICreateNewCategory {
  createNewCategory: (category: Category) => Promise<number>
  handlerClose: () => void
  getCategories: () => void
}

interface IForm {
  categoryName: string
  parentCategoryId: number
}

export const CreateNewCategory: FC<ICreateNewCategory> = ({
  createNewCategory,
  handlerClose,
  getCategories
}) => {
  const { register, handleSubmit,formState: {dirtyFields} } = useForm<IForm>({
    defaultValues:{
      categoryName:""
    }
  })
  const onSubmit = async (data: IForm) => {
    await createNewCategory({
      name: data.categoryName,
      parentCategoryId: data.parentCategoryId,
      id: generateId(),
      features:[]
    })
    await getCategories()

    handlerClose()
  }
  return (
    <form
      className="flex flex-col h-full rounded-b"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-auto grid grid-cols-2 grid-rows-3 gap-4">
        <div className="flex flex-col gap-2">
          <div>Название категории</div>
          <Field {...register("categoryName")} placeholder="samsung" />
        </div>
        <div className="flex flex-col gap-2">
          <div>parentCategoryId</div>
          <Field {...register("parentCategoryId")} placeholder="1754" />
        </div>
        <div className="col-span-2 row-span-2">
          <Chips />
        </div>
      </div>
      <div className="flex">
        <div className="flex-auto justify-end gap-4 flex">
          <Button onClick={handlerClose}>Отмена</Button>
          <Button isDangerous={true} disabled={!dirtyFields.categoryName}>
            Создать
          </Button>
        </div>
      </div>
    </form>
  )
}

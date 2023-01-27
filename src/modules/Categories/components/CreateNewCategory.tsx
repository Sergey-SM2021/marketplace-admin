import { Category } from "entity"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { Button } from "ui/Button"
import { Field } from "ui/Field"
import { generateId } from "utils/generateId"

interface ICreateNewCategory {
  createNewCategory: (category: Category) => Promise<number>
  handlerClose: () => void
  getCategories: () => Promise<Array<Category>>
}

interface IForm {
  categoryName: string
  parentCategoryId: number
}

export const CreateNewCategory: FC<ICreateNewCategory> = ({
  createNewCategory,
  handlerClose,
  getCategories,
}) => {
  const { register, handleSubmit } = useForm<IForm>()
  const onSubmit = async (data: IForm) => {
    if (data.categoryName) {
      await createNewCategory({
        name: data.categoryName,
        parentCategoryId: data.parentCategoryId,
        id: generateId(),
      })
      await getCategories()
      handlerClose()
    } else {
      alert("")
    }
  }
  return (
    <form
      className="flex flex-col h-full rounded-b"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-auto grid grid-cols-2 gap-4 grid-rows-6">
        <Field
          {...register("categoryName")}
          title="Название категории"
          placeholder="samsung"
        />
        <Field
          {...register("parentCategoryId")}
          title="parentCategoryId"
          placeholder="1754"
        />
      </div>
      <div className="flex">
        <div className="flex-auto justify-end gap-4 flex">
          <Button onClick={handlerClose}>Отмена</Button>
          <Button isDangerous={true}>Создать</Button>
        </div>
      </div>
    </form>
  )
}

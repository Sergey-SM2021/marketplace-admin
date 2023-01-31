import { useFieldArray, useForm } from "react-hook-form"
import { Field, Button } from "ui"
import { Chips } from "./Chips"
import { FC, memo } from "react"
import { CreateCategoryCommand, EditCategoryCommand } from "entity"

interface IForm {
  categoryName: string
  parentCategoryId: number
  attributes: { text: string }[]
}

interface ICreateNewCategory {
  handlerSave: (
    data: CreateCategoryCommand | EditCategoryCommand
  ) => Promise<void>
  handlerClose: () => void
}

export const CreateNewCategory: FC<ICreateNewCategory> = memo(
  ({ handlerSave, handlerClose }) => {
    const {
      register,
      handleSubmit,
      formState: { dirtyFields },
      control,
    } = useForm<IForm>({
      defaultValues: {
        categoryName: "",
        attributes: [{ text: "hi, hi, hi" }],
      },
    })
    const { append, remove, fields } = useFieldArray({
      name: "attributes",
      control,
    })
    const onSubmit = async (data: IForm) => {
      await handlerSave({
        features: data.attributes.map(attr => attr.text),
        name: data.categoryName,
        parentCategoryId: data.parentCategoryId,
      })
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
            <Chips
              Chips={fields}
              AddChip={text => {
                append({ text })
              }}
              RemoveChip={index => {
                remove(index)
              }}
            />
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
)

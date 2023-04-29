import { FC, FormEvent, memo, useState } from "react"
import { Add, Field } from "ui"

interface IChips {
  Chips: {text:string}[]
  AddChip: (text:string) => void
  RemoveChip: (id:number) => void
}

export interface IChip {
  text: string
  id: number
}

export const Chips: FC<IChips> = memo(({ Chips, AddChip, RemoveChip }) => {
  const [value, setValue] = useState<string>()
  const handlerAddChip = () => {
    if (value) {
      AddChip(value)
    }
    setValue("")
  }
  const handlerChangeValue = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const handlerRemoveChip = (id: number) => {
    RemoveChip(id)
  }
  return (
    <>
      <div className="flex gap-2 mb-4 items-end">
        <div className="flex-auto">
          <div className="mb-4">Добавить Атрибут</div>
          <Field
            value={value}
            onChange={handlerChangeValue}
            placeholder="Есть в наличии"
          />
        </div>
        <Add handlerAdd={handlerAddChip} />
      </div>
      <ul className="gap-4 grid grid-cols-4 pb-4">
        {Chips.map(({text},index) => (
          <li key={index} className="flex gap-2 bg-purple py-1 px-2 rounded">
            <div className="flex-auto">{text}</div>
            <button type="button" onClick={() => handlerRemoveChip(index)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  )
})

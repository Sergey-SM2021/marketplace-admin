import { FormEvent, useState } from "react"
import { Field } from "ui"
import { generateId } from "utils/generateId"

interface IChip {
  text: string
  id: number
}

export const Chips = () => {
  const [value, setValue] = useState<string>()
  const [chips, setChips] = useState<Array<IChip>>([])
  const handlerAddChip = () => {
    if (value) {
      setChips([...chips, { id: generateId(), text: value }])
    }
    setValue("")
  }
  const handlerChangeValue = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const handlerRemoveChip = (id: number) => {
    setChips(prev => prev.filter(chip => chip.id !== id))
  }
  return (
    <>
      <div className="flex flex-col gap-2 mb-4">
        <div>Добавить Атрибут</div>
        <div className="flex gap-4">
          <Field
            value={value}
            onChange={handlerChangeValue}
            placeholder="Есть в наличии"
          />
          <button type="button" onClick={handlerAddChip}>
            +
          </button>
        </div>
      </div>
      <ul className="gap-4 grid grid-cols-4 pb-4">
        {chips.map(({id,text}) => (
          <li key={id} className="flex gap-2 bg-purple py-1 px-2 rounded">
            <div className="flex-auto">{text}</div>
            <button type="button" onClick={()=>handlerRemoveChip(id)}>x</button>
          </li>
        ))}
      </ul>
    </>
  )
}

import { FormEvent, useState } from "react"
import { Button, Field } from "ui"

export const Chips = () => {
  const [value, setValue] = useState("")
  const [chips, setChips] = useState(["В наличии"])
  const handlerAddChip = () => {
    setChips([...chips, value])
  }
  const handlerChangeValue = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  return (
    <>
      <div className="flex flex-col gap-2 mb-4">
        <div>Добавить Атрибут</div>
        <div className="flex gap-4">
          <Field onChange={handlerChangeValue} placeholder="Есть в наличии" />
          <button type="button" onClick={handlerAddChip}>
            +
          </button>
        </div>
      </div>
      <div className="flex gap-1">
        {chips.map(chip => (
          <Button>{chip}</Button>
        ))}
      </div>
    </>
  )
}

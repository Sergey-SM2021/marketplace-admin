import { ReactComponent as DropdownIcon } from "assets/dropdown.svg"
import classNames from "classnames"
import { FC, FormEvent, memo, useEffect, useState } from "react"

interface IDropdown {
  list: Array<{ key: string; value: string | number }>
  handlerChoose: (value: string | number) => void
}

export const Dropdown: FC<IDropdown> = memo(({ list, handlerChoose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [DropdownList, setDropdownList] = useState(list)
  const [text, setText] = useState("")
  const [value, setValue] = useState<string | number>(0)

  // filter items list
  useEffect(() => {
    setDropdownList(list.filter(el => el.key.includes(text)))
  }, [text])

  // subscribe to coincidence введённого текста и любого item
  // сетаем его value в стейт
  useEffect(() => {
    if (text.length) {
      setValue(list.find(el => el.key === text)!.value)
    }
    setIsDropdownOpen(false)
  }, [list.some(el => el.key === text)])

  // При записи value вызываем callback
  useEffect(() => {
    if (value) {
      alert(value)
    }
  }, [value])

  const handlerClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handlerChange = (e: FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  const handlerItemChoose = (item: { key: string; value: string | number }) => {
    setText(item.key)
  }

  return (
    <div className="rounded h-auto max-h-2 relative">
      <input
        value={text}
        type="text"
        onChange={handlerChange}
        className="w-full h-auto p-1 rounded-t outline-none pr-11 pl-3"
      />
      <div className="absolute right-1 top-0">
        <DropdownIcon
          className={classNames(
            "hover:cursor-pointer h-8 w-8 transition",
            isDropdownOpen ? "" : "rotate-90"
          )}
          onClick={handlerClick}
        />
      </div>
      {isDropdownOpen ? (
        <div className="bg-purple rounded absolute top-9 right-0 left-0">
          <ul>
            {DropdownList.map(item => (
              <li className="p-1" onClick={() => handlerItemChoose(item)}>
                {item.key}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
})

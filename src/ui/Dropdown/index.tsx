import { ReactComponent as DropdownIcon } from "assets/dropdown.svg"
import classNames from "classnames"
import { FC, memo, useEffect, useRef, useState } from "react"

interface IDropdown {
  name: string
  onChange: (any: any) => void
  listInit: Array<{ key: string; value: number }>
}

export const Dropdown: FC<IDropdown> = memo(({ listInit, onChange, name }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [text, setText] = useState(name)
  const [list, setList] = useState(listInit)

  useEffect(() => {
    setList(listInit.filter(el => el.key.includes(text)))
  }, [text, listInit])

  useEffect(() => {
    setText(name)
  }, [name])

  useEffect(() => {
    document.addEventListener("mousedown", (e: MouseEvent) => {
      if (ref.current?.contains(e.target as Node)) {
        return
      }
      setIsDropdownOpen(false)
    })
  }, [ref])

  const handlerClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div
      onClick={handlerClick}
      ref={ref}
      className="rounded h-auto max-h-2 relative">
      <input
        placeholder="Техника"
        onChange={e => setText(e.currentTarget.value)}
        type="text"
        value={text}
        className="w-full h-auto p-1 rounded-t outline-none pr-11 pl-3"
      />
      <div className="absolute right-1 top-0">
        <DropdownIcon
          className={classNames(
            "hover:cursor-pointer h-8 w-8 transition",
            isDropdownOpen ? "" : "rotate-90"
          )}
        />
      </div>
      {isDropdownOpen ? (
        <div className="bg-purple rounded absolute top-9 right-0 left-0">
          <ul>
            {list.map(item => (
              <li
                className="p-1"
                onClick={() => {
                  onChange(item)
                }}>
                {item.key}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
})

import { ReactComponent as DropdownIcon } from "assets/dropdown.svg"
import classNames from "classnames"
import { FC, memo, useState } from "react"

interface IDropdown {
  list: Array<{ key: string; value: number }>
  name: string
  onChange: (any: any) => void
}

export const Dropdown: FC<IDropdown> = memo(({ list, onChange, name }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handlerClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <div onClick={handlerClick} className="rounded h-auto max-h-2 relative">
      <input
        value={name}
        type="text"
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

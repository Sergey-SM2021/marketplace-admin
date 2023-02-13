import { ReactComponent as AddIcon } from "admin/assets/add.svg"
import { FC } from "react"

interface IAdd {
  handlerAdd: () => void
}

export const Add: FC<IAdd> = ({ handlerAdd }) => {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 bg-purple rounded hover:cursor-pointer"
      onClick={handlerAdd}>
      <AddIcon className="w-full h-full fill-white" />
    </div>
  )
}

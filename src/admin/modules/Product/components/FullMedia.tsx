import { FC } from "react"

interface IFullMedia {
  onClose: () => void
}

export const FullMedia: FC<IFullMedia> = ({ onClose }) => {
  return (
    <div className=" bg-[rgba(#2A2C38, .7)] hover:cursor-not-allowed absolute inset-0 w-full h-full p-10 backdrop-blur-sm">
      <img
        onClick={onClose}
        className="object-cover w-full h-full"
        src="https://www.notebookcheck-ru.com/uploads/tx_nbc2/SL4_AMD_1.jpg"
        alt=""
      />
    </div>
  )
}

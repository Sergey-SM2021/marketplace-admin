import { FC } from "react"

interface ISlider {
  onScaleing: () => void
}

export const Slider: FC<ISlider> = ({ onScaleing }) => {
  return (
    <div>
      <img
        onClick={onScaleing}
        className="hover:cursor-zoom-in"
        src="https://www.notebookcheck-ru.com/uploads/tx_nbc2/SL4_AMD_1.jpg"
        alt="preview"
      />
      <div>slider</div>
    </div>
  )
}

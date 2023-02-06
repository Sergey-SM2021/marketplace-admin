import { EditCategoryCommand } from "entity"
import { useState } from "react"

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false)
  const [state, setState] = useState<EditCategoryCommand | null>(null)

  const hanlerOpen = (state?: EditCategoryCommand) => {
    setIsOpen(true)
    setState(state ?? null)
  }

  const handlerClose = () => {
    setIsOpen(false)
    setState(null)
  }

  return {
    isOpen,
    state,
    hanlerOpen,
    handlerClose,
  }
}

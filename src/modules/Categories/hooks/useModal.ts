import { Category } from './../../../entity/models/Category';
import { useState } from "react"

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false)
  const [state, setState] = useState<Category | null>(null)

  const hanlerOpen = (state?: Category) => {
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

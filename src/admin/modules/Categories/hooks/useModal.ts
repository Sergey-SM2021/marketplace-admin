import { useState } from "react"

export function useModal<T>(initState: T | null) {
  const [isOpen, setIsOpen] = useState<Boolean>(false)
  const [state, setState] = useState<T | null>(initState)

  const hanlerOpen = (state?: T) => {
    setIsOpen(true)
    setState(state ?? null)
  }

  const handlerClose = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    state,
    hanlerOpen,
    handlerClose,
  }
}

import { useState } from "react"

export function useModal<T>(initState: T | null) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [state, setState] = useState<T | null>(initState)

  const hanlerOpen = (st?: T) => {
    setIsOpen(true)
    setState(st ?? null)
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

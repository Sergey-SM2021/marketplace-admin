import { Category } from "types"

import { Button } from "ui"

import { FC, memo, SyntheticEvent, useState } from "react"

interface IWatchChild {
  index: number
  categories?: Category[] | null
  action: () => void
}

export const WatchChild: FC<IWatchChild> = memo(({ categories, action, index }) => {
  const [value, setValue] = useState(false)

  if (!categories?.length) {
    return null
  }

  const onClick = (e: SyntheticEvent) => {
    setValue(prev => !prev)
    e.stopPropagation()
    action()
  }

  return (
    <Button onClick={onClick} isDangerous={value} disabled={value}>
      whatch children
    </Button>
  )
})

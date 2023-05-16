import { Button } from "@chakra-ui/react"
import { type Category } from "Shared/types"
import { memo, type SyntheticEvent, useState } from "react"

interface IWatchChild {
  index: number
  categories?: Category[] | null
  action: () => void
}

export const WatchChild = memo(({ categories, action, index }: IWatchChild) => {
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
		<Button onClick={onClick} disabled={value}>
      whatch children
		</Button>
	)
})

WatchChild.displayName = "WatchChild"
